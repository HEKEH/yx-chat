#!/bin/bash

IMAGE_NAME="yx-chat-file-center"

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
LOG_FILE=${SCRIPT_DIR}/build-image.log

PROJECT_ROOT="${SCRIPT_DIR}/../../../../"
cd "${PROJECT_ROOT}" # assure current dir is the exact project root directory

# get version from package.json
# VERSION=$(node -p "require('./apps/file-center/package.json').version")
# IMAGE_TAG="${IMAGE_NAME}:${VERSION}"

function log() {
  echo "$1" | tee -a ${LOG_FILE}
}

function log_error() {
  echo "Error: $1" | tee -a "${LOG_FILE}" >&2
}

function load_from_env_file() {
  local ENV_FILE="$1"
  if [ -f "$ENV_FILE" ]; then
    while IFS= read -r line || [[ -n "$line" ]]; do
      # Remove leading/trailing whitespace and trailing comments
      line=$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*#.*$//' -e 's/[[:space:]]*$//')

      # Ignore empty lines
      if [[ -n $line ]]; then
        # Extract key and value
        key=$(echo "$line" | cut -d '=' -f 1)
        value=$(echo "$line" | cut -d '=' -f 2-)

        # # Remove quotes from the value if present
        # value=$(echo "$value" | sed -e 's/^["\x27]//' -e 's/["\x27]$//')

        # Export all environment variables as strings
        export "${key}=${value}"
        log "Exported env: ${key}=${value}"
      fi
    done <"$ENV_FILE"
  else
    echo "$ENV_FILE file not found"
    return 1
  fi
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

function create_volume_if_not_exists() {
  local volume_name=$1
  if ! docker volume inspect $volume_name >/dev/null 2>&1; then
    echo "Creating volume: $volume_name"
    docker volume create $volume_name
  else
    echo "Volume $volume_name already exists"
  fi
}

function run_container() {
  local volume_name="yx-file-center"
  create_volume_if_not_exists $volume_name

  log "Info: Running new container"
  local command="docker run -d -p ${PORT}:${PORT} --name ${IMAGE_NAME} --mount source=${volume_name},target=${FILE_UPLOAD_DIR} ${IMAGE_NAME}"
  log "command: ${command}"
  if ${command} >>${LOG_FILE} 2>&1; then
    log "Container started successfully."
    log "To see container logs, use: docker logs ${IMAGE_NAME}"
  else
    log_error "Failed to start the container. Check ${LOG_FILE} for details."
    exit 1
  fi
}

function main() {
  : >"${LOG_FILE}"
  load_from_env_file "${PROJECT_ROOT}/.env.production"
  PORT=${FILE_CENTER_PORT}

  remove_image
  build_image

  # if yout only want to build image, then no need to run the following commands
  stop_and_remove_container
  run_container

  log "All mission successfully completed. See ${LOG_FILE} for logs."
}

main "$@" # call main function with all arguments
