#!/bin/bash

cd "$(dirname "$0")"

create_volume_if_not_exists() {
  local volume_name=$1
  if ! docker volume inspect $volume_name >/dev/null 2>&1; then
    echo "Creating volume: $volume_name"
    docker volume create $volume_name
  else
    echo "Volume $volume_name already exists"
  fi
}

export MONGO_PORT=27018
export CONTAINER_NAME=yx-chat-mongodb-prod

# docker network create mongo-network
create_volume_if_not_exists mongo-data-prod
create_volume_if_not_exists mongo-config-prod

docker-compose -f ./docker-composer.yml up -d
