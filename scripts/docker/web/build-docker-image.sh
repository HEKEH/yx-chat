#!/bin/bash
IMAGE_NAME="yx-chat-web"
ERROR=""

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
PROJECT_ROOT="${SCRIPT_DIR}/../../../"
cd "${PROJECT_ROOT}" # assure current dir is the exact project root directory
LOG_FILE=${SCRIPT_DIR}/build-local-image.log

function stop_and_remove_container() {
  # Stop and remove the existing container
  docker stop ${IMAGE_NAME} >/dev/null 2>&1
  docker rm ${IMAGE_NAME} >/dev/null 2>&1
}

function remove_image() {
  # Remove the existing image
  docker rmi ${IMAGE_NAME} >/dev/null 2>&1
}

function build_image() {
  # build docker
  docker build . -f "${SCRIPT_DIR}/Dockerfile" -t "${IMAGE_NAME}" || ERROR="build_image failed"
}

function log_message() {
  if [[ ${ERROR} != "" ]]; then
    echo >&2 "build failed, Please check build-local-docker-image.log for more details"
    echo >&2 "ERROR: ${ERROR}"
    exit 1
  else
    echo "docker image with tag '${IMAGE_NAME}' built sussessfully. Use below sample command to run the container"
    echo "docker run -d -p 8010:8080 --name ${IMAGE_NAME} ${IMAGE_NAME}"
    echo ""
    echo "Use below sample command to see logs"
    echo "docker logs ${IMAGE_NAME}"
  fi
}

echo "Info: Stopping and removing existing container and image" | tee ${LOG_FILE}
stop_and_remove_container
remove_image

if [[ ${ERROR} == "" ]]; then
  echo "Info: Building docker image" | tee -a ${LOG_FILE}
  build_image 1>>${LOG_FILE} 2>>${LOG_FILE}
fi

log_message | tee -a ${LOG_FILE}
