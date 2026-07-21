FROM --platform=linux/amd64 node:21-slim AS base

WORKDIR /src

RUN corepack enable

# Build
FROM base AS build

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm run build

# Run
FROM base

ENV PORT=3000
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
