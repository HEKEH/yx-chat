ARG PORT

FROM node:20-slim AS builder

# --max-old-space-size
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS=--max-old-space-size=8192
ENV TZ=Asia/Shanghai

RUN corepack enable

WORKDIR /app

# copy package.json and pnpm-lock.yaml to workspace
COPY . /app

RUN npm install -g pnpm@8.15.8 --force

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build:server

RUN echo "Builder Success 🎉"

WORKDIR /app/packages/server

CMD ["pnpm", "run", "start"]
