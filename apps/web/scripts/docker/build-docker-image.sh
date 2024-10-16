#!/bin/bash

IMAGE_NAME="yx-chat-web"

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
LOG_FILE="${SCRIPT_DIR}/build-image.log"

PROJECT_ROOT="${SCRIPT_DIR}/../../../../"
cd "${PROJECT_ROOT}" # assure current dir is the exact project root directory

function log() {
  echo "$1" | tee -a "${LOG_FILE}"
}

function log_error() {
  echo "Error: $1" | tee -a "${LOG_FILE}" >&2
}

function remove_image() {
  log "Info: Removing existing image"
  docker rmi "${IMAGE_NAME}" >/dev/null 2>&1
}

function build_image() {
  log "Info: Building docker image"
  if docker build . -f "${SCRIPT_DIR}/Dockerfile" -t "${IMAGE_NAME}" >>${LOG_FILE} 2>&1; then
    log "Docker image '${IMAGE_NAME}' built successfully."
  else
    log_error "build failed, Please check ${LOG_FILE} for more details"
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
  if docker run -d -p 8010:8080 --name ${IMAGE_NAME} ${IMAGE_NAME} >>${LOG_FILE} 2>&1; then
    log "Container started successfully."
    log "To see container logs, use: docker logs ${IMAGE_NAME}"
  else
    log_error "Failed to start the container. Check ${LOG_FILE} for details."
    exit 1
  fi
}

function main() {
  : >"${LOG_FILE}"
  remove_image
  build_image

  # if yout only want to build image, then no need to run the following commands
  stop_and_remove_container
  run_container

  log "All mission successfully completed. See ${LOG_FILE} for logs."
}

main "$@" # call main function with all arguments
