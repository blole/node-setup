# syntax=docker/dockerfile:1.4
FROM ubuntu:22.04 AS tools
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    --mount=type=cache,target=/var/cache/apt,sharing=locked \
    apt-get update && \
    apt-get install --no-install-recommends --no-install-suggests -yqq curl ca-certificates

ENV BASH_ENV /root/.env
RUN touch "$BASH_ENV" && \
    echo '. "'"$BASH_ENV"'"' >> ~/.bashrc && \
    echo 'shopt -s globstar' >> "$BASH_ENV"

WORKDIR /repo/

# Install nvm, node, pnpm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | PROFILE="$BASH_ENV" bash
COPY .nvmrc ./
RUN nvm install && \
   corepack enable && \
   corepack prepare pnpm@8.15.1 --activate
RUN mkdir /output && printf "\
nvm  $(nvm -v)\n\
node $(node -v)\n\
npm  $(npm -v)\n\
pnpm $(pnpm -v)\n\
" |& tee /output/versions.txt



FROM tools AS common-dependencies
COPY pnpm-lock.yaml ./
#ADD https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Stockholm /tmp/currenttime
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm fetch --color
COPY \
    tsconfig.json \
    package.json \
    pnpm-workspace.yaml \
    ./
COPY packages/lint/package.json packages/lint/package.json
COPY packages/test/package.json packages/test/package.json
RUN pnpm install --color --frozen-lockfile --offline



FROM common-dependencies AS packages-lint
COPY packages/lint/ packages/lint/

FROM packages-lint AS packages-lint-lint
RUN mkdir -p /output/packages/lint/ && \
    cd packages/lint && \
    pnpm lint --color |& tee /output/packages/lint/lint.txt



FROM common-dependencies AS packages-test
COPY packages/lint/ packages/lint/
COPY packages/test/ packages/test/

FROM packages-test AS packages-test-lint
RUN mkdir -p /output/packages/test/ && \
    cd packages/test && \
    pnpm lint --color |& tee /output/packages/test/lint.txt

FROM packages-test AS packages-test-test
RUN mkdir -p /output/packages/test/ && \
    cd packages/test && \
    pnpm test --color |& tee /output/packages/test/test.txt



FROM scratch AS ci
COPY --from=packages-lint-lint /output/ /
COPY --from=packages-test-lint /output/ /
COPY --from=packages-test-test /output/ /
