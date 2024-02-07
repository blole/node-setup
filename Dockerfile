# syntax=docker/dockerfile:1.4
FROM ubuntu:22.04 AS tools
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    --mount=type=cache,target=/var/cache/apt,sharing=locked \
    apt-get update && \
    apt-get install --no-install-recommends --no-install-suggests -yqq \
      ca-certificates curl jq

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
RUN mkdir /output/ && printf "\
nvm  $(nvm -v)\n\
node $(node -v)\n\
npm  $(npm -v)\n\
pnpm $(pnpm -v)\n\
" |& tee /output/versions.txt



FROM tools AS common-dependencies
COPY pnpm-lock.yaml ./
#ADD https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Stockholm /tmp/currenttime
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm fetch --color |& tee /output/pnpm-fetch.txt
COPY \
    .editorconfig \
    package.json \
    pnpm-workspace.yaml \
    tsconfig.json \
    ./
COPY packages/lint/package.json packages/lint/package.json
RUN pnpm install --color --frozen-lockfile --offline |& tee /output/pnpm-install.txt



FROM common-dependencies AS packages-lint
RUN mkdir -p /output/packages/lint/
COPY packages/lint/ packages/lint/
WORKDIR /repo/packages/lint/

FROM packages-lint AS packages-lint-build
RUN pnpm build |& tee /output/packages/lint/build.txt

FROM packages-lint AS packages-lint-lint
COPY --from=packages-lint-build /repo/packages/lint/dist/ /repo/packages/lint/dist/
RUN pnpm lint --color |& tee /output/packages/lint/lint.txt

FROM packages-lint-lint AS packages-lint-publish
ARG TAG_VERSION
RUN PACKAGE_VERSION="$(jq -r '.version' package.json)" && \
    if [ "$PACKAGE_VERSION" != "${TAG_VERSION?}" ]; then \
      echo "error: build arg TAG_VERSION=$TAG_VERSION does not match the package.json version: $PACKAGE_VERSION"; \
      exit 1; \
    fi
RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    echo "//registry.npmjs.org/:_authToken=$(cat /run/secrets/NODE_AUTH_TOKEN)" > .npmrc && \
    pnpm publish



FROM scratch AS ci
COPY --from=packages-lint-build /output/ /
COPY --from=packages-lint-lint /output/ /
