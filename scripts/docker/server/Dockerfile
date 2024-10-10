ARG PORT

FROM node:20-slim AS builder

# Fist stage: Build stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS=--max-old-space-size=8192

RUN corepack enable

WORKDIR /app

COPY . /app

RUN npm install -g pnpm@8.15.8 --force

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build:server

RUN pnpm --filter @yx-chat/server --prod deploy /deploy/@yx-chat/server
RUN rm -rf /deploy/@yx-chat/server/src
RUN cp -r .env.production /deploy

RUN echo "Builder Success 🎉"

# Second stage: Runtime stage
FROM node:20-slim AS production
ENV NODE_OPTIONS=--max-old-space-size=8192
ENV TZ=Asia/Shanghai

WORKDIR /app

# 仅复制必要的文件（比如构建后的产物和生产依赖）
COPY --from=builder /deploy .

WORKDIR /app/@yx-chat/server

CMD ["npm", "run", "start"]
