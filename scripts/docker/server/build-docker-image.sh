#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
LOG_FILE=${SCRIPT_DIR}/build-local-image.log
ERROR=""

IMAGE_NAME="yx-chat-server"
# # get version from package.json
# VERSION=$(node -p "require('./packages/server/package.json').version")
# IMAGE_TAG="${IMAGE_NAME}:${VERSION}"

PORT=""
function load_port_from_env_file() {
    local env_file="./.env.production"
    local port_var_name="PUBLIC_SERVER_PORT"

    if [ ! -f "$env_file" ]; then
        echo "Error: $env_file file not found" >&2
        return 1
    fi

    PORT=$(grep -E "^[[:space:]]*$port_var_name[[:space:]]*=" "$env_file" | sed -E "s/^[[:space:]]*$port_var_name[[:space:]]*=[[:space:]]*[\"']?([^\"']+)[\"']?[[:space:]]*$/\1/" | tr -d '\n\r')

    if [ -z "$PORT" ]; then
        echo "Error: $port_var_name not found in $env_file" >&2
        return 1
    fi

    return 0

#     local env_file="$1"
#     if [ -f "$env_file" ]; then
#         while IFS= read -r line || [[ -n "$line" ]]; do
#             # 去除行首尾的空白字符
#             line=$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')

#             # 忽略注释和空行
#             if [[ ! $line =~ ^\# && -n $line ]]; then
#                 # 提取键和值
#                 key=$(echo "$line" | cut -d '=' -f 1)
#                 value=$(echo "$line" | cut -d '=' -f 2-)

#                 # 去除值两端的引号
#                 value=$(echo "$value" | sed -e 's/^["\x27]//' -e 's/["\x27]$//')

#                 # 导出变量
#                 if [[ -n "$key" && -n "$value" && "$key" = 'PUBLIC_SERVER_PORT' ]]; then
#                     PORT=$value
#                     return 0
#                 fi
#             fi
#         done < "$env_file"
#     else
#         echo "$env_file file not found"
#         return 1
#     fi d
}


if ! load_port_from_env_file; then
    exit 1
fi

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
    docker build . -f "${SCRIPT_DIR}/Dockerfile" --build-arg PORT="${PORT}" -t "${IMAGE_NAME}" || ERROR="build_image failed"
}

function log_message() {
    if [[ ${ERROR} != "" ]];
    then
        >&2 echo "build failed, Please check build-local-docker-image.log for more details"
        >&2 echo "ERROR: ${ERROR}"
        exit 1
    else
        echo "docker image with tag '${IMAGE_NAME}' built sussessfully. Use below sample command to run the container"
        echo "docker run -d -p ${PORT}:${PORT} --name ${IMAGE_NAME} ${IMAGE_NAME}"
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
    build_image 1>> ${LOG_FILE} 2>> ${LOG_FILE}
fi

log_message | tee -a ${LOG_FILE}
