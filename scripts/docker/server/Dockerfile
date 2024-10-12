FROM node:20.11.1-slim AS builder

# First stage: Build stage
ENV PNPM_HOME="/pnpm" \
  PATH="$PNPM_HOME:$PATH" \
  NODE_OPTIONS="--max-old-space-size=8192"

RUN corepack enable
RUN npm install -g pnpm@8.15.8 --force

WORKDIR /app

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build:server
RUN pnpm --filter @yx-chat/server --prod deploy /deploy/@yx-chat/server
RUN rm -rf /deploy/@yx-chat/server/src
RUN cp -r .env.production /deploy
RUN echo "Builder Success 🎉"

# Second stage: Production stage
FROM node:20.11.1-slim AS production
ENV NODE_OPTIONS="--max-old-space-size=8192" \
  TZ="Asia/Shanghai"

# Copy only necessary files from the builder stage
COPY --from=builder /deploy /app

WORKDIR /app/@yx-chat/server

ARG PORT
EXPOSE ${PORT}

CMD ["npm", "run", "start"]
