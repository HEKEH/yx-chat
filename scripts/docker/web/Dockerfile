# First stage: Build stage
FROM node:20.11.1-slim AS builder

ENV PNPM_HOME="/pnpm" \
  PATH="$PNPM_HOME:$PATH" \
  NODE_OPTIONS="--max-old-space-size=8192" \
  TZ="Asia/Shanghai"

RUN corepack enable
RUN npm install -g pnpm@8.15.8 --force

COPY . /app
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build:web

RUN echo "Builder Success 🎉"

# Second stage: Production stage
FROM nginx:1.26.2-alpine AS production

RUN echo "types { application/javascript js mjs; }" >/etc/nginx/conf.d/mjs.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

RUN rm -f /etc/nginx/nginx.conf
COPY --from=builder /app/scripts/docker/web/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

# start nginx
CMD ["nginx", "-g", "daemon off;"]
