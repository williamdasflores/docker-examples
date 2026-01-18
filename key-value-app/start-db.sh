MONGODB_IMAGE=mongodb/mongodb-community-server
MONGODB_TAG=7.0-ubuntu2204
source .env.db
#CONTAINER_NAME=mongodb

# Root credentials
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"

#Key-value credentials
#KEY_VALUE_DB="key-value-db"
#KEY_VALUE_USER="key-value-user"
#KEY_VALUE_PASSWORD="key-value-password"

#Connectivity
LOCALHOST_PORT=27017 #27017 is default port of MongoDB
CONTAINER_PORT=27017
source .env.network
#NETWORK_NAME="key-value-net" #Create the network on Docker docker create network key-value-net

#Storage
source .env.volume
#VOLUME_NAME="key-value-data" #Create the volume on Docker docker create volume key-value-data
VOLUME_CONTAINER_PATH="/data/db" #Default path of MongoDB

source setup.sh

if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Container with name=$DB_CONTAINER_NAME already exists. Skipping it!!"
    echo "The container will be remove when stopped."
    echo "To stop the container, run docker stop $DB_CONTAINER_NAME"
else 
    echo "Creating container..."
    docker run --rm -d --name $DB_CONTAINER_NAME \
        -e MONGODB_INITDB_ROOT_USERNAME=$ROOT_USER \
        -e MONGODB_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
        -e KEY_VALUE_DB=$KEY_VALUE_DB \
        -e KEY_VALUE_USER=$KEY_VALUE_USER \
        -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
        -p $LOCALHOST_PORT:$CONTAINER_PORT \
        -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
        -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
        --network $NETWORK_NAME \
        $MONGODB_IMAGE:$MONGODB_TAG
fi