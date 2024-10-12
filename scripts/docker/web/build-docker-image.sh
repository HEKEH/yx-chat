#!/bin/bash

IMAGE_NAME="yx-chat-web"

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
PROJECT_ROOT="${SCRIPT_DIR}/../../../"
cd "${PROJECT_ROOT}" # assure current dir is the exact project root directory
LOG_FILE="${SCRIPT_DIR}/build-local-image.log"

if [ -f "${LOG_FILE}" ]; then
  rm "${LOG_FILE}"
fi
function log() {
  echo "$1" | tee -a ${LOG_FILE}
}

function remove_image() {
  log "Info: Stopping and removing existing image"
  # Remove the existing image
  docker rmi ${IMAGE_NAME} >/dev/null 2>&1
}

function build_image() {
  log "Info: Building docker image"
  # build docker
  docker build . -f "${SCRIPT_DIR}/Dockerfile" -t "${IMAGE_NAME}" 1>>${LOG_FILE} 2>>${LOG_FILE}
  if [ $? -eq 0 ]; then
    log "docker image with tag '${IMAGE_NAME}' built sussessfully."
  else
    echo >&2 "build failed, Please check build-local-image.log for more details"
    exit 1
  fi
}

function stop_and_remove_container() {
  log "Info: Stopping and removing existing container"
  # Stop and remove the existing container
  docker stop ${IMAGE_NAME} >/dev/null 2>&1
  docker rm ${IMAGE_NAME} >/dev/null 2>&1
}

function run_container() {
  log "Info: Running new container"
  docker run -d -p 8010:8080 --name ${IMAGE_NAME} ${IMAGE_NAME} 1>>${LOG_FILE} 2>>${LOG_FILE}
  if [ $? -eq 0 ]; then
    log "Container started successfully."
    log "Use below sample command to see container logs"
    log "docker logs ${IMAGE_NAME}"
  else
    log "Failed to start the container. Please check the logs for details."
    exit 1
  fi
}

remove_image

build_image

stop_and_remove_container

run_container
