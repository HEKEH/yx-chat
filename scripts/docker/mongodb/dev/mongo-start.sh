#!/bin/bash

cd "$(dirname "$0")"

create_volume_if_not_exists() {
    local volume_name=$1
    if ! docker volume inspect $volume_name > /dev/null 2>&1; then
        echo "Creating volume: $volume_name"
        docker volume create $volume_name
    else
        echo "Volume $volume_name already exists"
    fi
}

# docker network create mongo-network
create_volume_if_not_exists mongo-data-dev
create_volume_if_not_exists mongo-config-dev

docker-compose -f ./docker-composer.yml up -d
