# File to remove artifacts
# Do not forget to give permission with chmod -x cleanup.sh

source .env.volume
source .env.network
source .env.db

if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    docker stop $DB_CONTAINER_NAME
else 
    echo "There is no container with name=$DB_CONTAINER_NAME!"
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
   docker volume rm $VOLUME_NAME
else
    echo "There is no  volume with name=$VOLUME_NAME!"
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    docker network rm $NETWORK_NAME
else
     echo "There is no network with name=$NETWORK_NAME!"
fi

