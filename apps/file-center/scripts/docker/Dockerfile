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
RUN pnpm run build:file-center
RUN pnpm --filter @yx-chat/file-center --prod deploy /deploy/@yx-chat/file-center
RUN cp -r .env.production /deploy
RUN echo "Builder Success 🎉"

# Second stage: Production stage
FROM node:20.11.1-slim AS production
ENV NODE_OPTIONS="--max-old-space-size=8192" \
  TZ="Asia/Shanghai"

# Copy only necessary files from the builder stage
COPY --from=builder /deploy /app

WORKDIR /app/@yx-chat/file-center

ARG PORT
EXPOSE ${PORT}

CMD ["npm", "run", "start"]
