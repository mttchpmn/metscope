#! /usr/bin/env bash

echo "Running deploy script for metscope"

echo "Taking Docker Container down"
docker-compose down

echo "Pulling from origin..."
git pull

echo "Bringing Docker Container up"
docker-compose up --build

echo "Deploy complete."