source .env.db
source .env.network

CONTAINER_BACKEND_NAME="backend"

LOCALHOST_PORT=3000
CONTAINER_PORT=3000

IMAGE_BACKEND=key-value-backend


if [ "$(docker images -aq -f reference=$IMAGE_BACKEND)" ]; then
    echo "Build image already exists!!"
    echo "Skipping it!!"
else
    docker build -t $IMAGE_BACKEND -f Dockerfile.dev .
fi

if [ "$(docker ps -aq -f name=$CONTAINER_BACKEND_NAME)" ]; then
    echo "Container with name=$CONTAINER_BACKEND_NAME already exists!"
    echo "To stop the container runs docker stop $CONTAINER_BACKEND_NAME"
else
    docker run --rm -d --name $CONTAINER_BACKEND_NAME \
    -e MONGO_DB=$DB_CONTAINER_NAME \
    -e MONGODB_NAME=$KEY_VALUE_DB \
    -e MONGODB_USERNAME=$KEY_VALUE_USER \
    -e MONGODB_PASSWORD=$KEY_VALUE_PASSWORD \
    -e PORT=$CONTAINER_PORT \
    -v ./src:/app/src \
    --network $NETWORK_NAME \
    -p $LOCALHOST_PORT:$CONTAINER_PORT \
    $IMAGE_BACKEND
fi

