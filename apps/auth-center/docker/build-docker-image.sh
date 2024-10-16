#!/bin/bash

IMAGE_NAME="yx-chat-server"

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
LOG_FILE=${SCRIPT_DIR}/build-image.log

PROJECT_ROOT="${SCRIPT_DIR}/../../../../"
cd "${PROJECT_ROOT}" # assure current dir is the exact project root directory

PORT=""

# get version from package.json
# VERSION=$(node -p "require('./apps/server/package.json').version")
# IMAGE_TAG="${IMAGE_NAME}:${VERSION}"

function log() {
  echo "$1" | tee -a ${LOG_FILE}
}

function log_error() {
  echo "Error: $1" | tee -a "${LOG_FILE}" >&2
}

function load_port_from_env_file() {
  local ENV_FILE="./.env.production"
  local PORT_VAR_NAME="PUBLIC_SERVER_PORT"

  if [ ! -f "$ENV_FILE" ]; then
    log_error "$ENV_FILE file not found"
    exit 1
  fi

  PORT=$(grep -E "^[[:space:]]*$PORT_VAR_NAME[[:space:]]*=" "$ENV_FILE" | sed -E "s/^[[:space:]]*$PORT_VAR_NAME[[:space:]]*=[[:space:]]*[\"']?([^\"']+)[\"']?[[:space:]]*$/\1/" | tr -d '\n\r')

  if [ -z "$PORT" ]; then
    log_error "$PORT_VAR_NAME not found in $ENV_FILE"
    exit 1
  fi

  # local ENV_FILE="$1"
  # if [ -f "$ENV_FILE" ]; then
  #   while IFS= read -r line || [[ -n "$line" ]]; do
  #     # 去除行首尾的空白字符
  #     line=$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')

  #     # 忽略注释和空行
  #     if [[ ! $line =~ ^\# && -n $line ]]; then
  #       # 提取键和值
  #       key=$(echo "$line" | cut -d '=' -f 1)
  #       value=$(echo "$line" | cut -d '=' -f 2-)

  #       # 去除值两端的引号
  #       value=$(echo "$value" | sed -e 's/^["\x27]//' -e 's/["\x27]$//')

  #       # 导出变量
  #       if [[ -n "$key" && -n "$value" && "$key" = 'PUBLIC_SERVER_PORT' ]]; then
  #         PORT=$value
  #         return 0
  #       fi
  #     fi
  #   done <"$ENV_FILE"
  # else
  #   echo "$ENV_FILE file not found"
  #   return 1
  # fi
}

function remove_image() {
  log "Info: Removing existing image"
  docker rmi "${IMAGE_NAME}" >/dev/null 2>&1
}

function build_image() {
  log "Info: Building docker image"
  if docker build . -f "${SCRIPT_DIR}/Dockerfile" -t "${IMAGE_NAME}" --build-arg PORT="${PORT}" >>${LOG_FILE} 2>&1; then
    log "Docker image '${IMAGE_NAME}' built successfully."
  else
    log_error "build failed, Check ${LOG_FILE} for more details"
    exit 1
  fi
}

function stop_and_remove_container() {
  log "Info: Stopping and removing existing container"
  docker stop ${IMAGE_NAME} >/dev/null 2>&1
  docker rm ${IMAGE_NAME} >/dev/null 2>&1
}

function run_container() {
  log "Info: Running new container"
  if docker run -d -p "${PORT}:${PORT}" --name ${IMAGE_NAME} ${IMAGE_NAME} >>${LOG_FILE} 2>&1; then
    log "Container started successfully."
    log "To see container logs, use: docker logs ${IMAGE_NAME}"
  else
    log_error "Failed to start the container. Check ${LOG_FILE} for details."
    exit 1
  fi
}

function main() {
  : >"${LOG_FILE}"
  load_port_from_env_file
  remove_image
  build_image

  # if yout only want to build image, then no need to run the following commands
  stop_and_remove_container
  run_container

  log "All mission successfully completed. See ${LOG_FILE} for logs."
}

main "$@" # call main function with all arguments
