# File responsible for creating volumes and network

# Before execute run chmod +x setup.sh

source .env.network
source .env.volume

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "A volume with the name=$VOLUME_NAME already exists. Skipping volume creation!"
else
    echo "Creating volume..."
    docker volume create $VOLUME_NAME
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "A network with the name=$NETWORK_NAME" already exists. Skipping network creation!""
else
    echo "Creating network..."
    docker network create $NETWORK_NAME
fi
