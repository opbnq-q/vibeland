FROM node:lts AS base

ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH"
WORKDIR /app

RUN --mount=type=cache,id=npm-cache,target=/root/.npm npm install -g pnpm@10

FROM base AS dependencies-dev
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=locked \
    pnpm fetch

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=locked \
    pnpm install

FROM base AS build
COPY package.json  pnpm-lock.yaml ./
COPY --from=dependencies-dev /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM dockerhub.timeweb.cloud/library/node:lts AS runtime

RUN groupadd -g 1001 appgroup \
    && useradd -u 1001 -g appgroup -M -s /usr/sbin/nologin appuser

WORKDIR /app

COPY --from=build --chown=appuser:appgroup /app/.output ./

ENV NODE_ENV=production \
    NODE_OPTIONS="--enable-source-maps" \
    PORT=3000

EXPOSE 3000

USER appuser

CMD node server/index.mjs
