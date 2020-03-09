#! /bin/bash

echo -e "\e[1;34mStarting Metscope in DEV mode\e[0m"

echo -e "\e[33mStopping current configuration...\e[0m"
docker-compose down;

echo -e "\e[33mRestarting services...\e[0m"
docker-compose -f docker-compose.yml up --detach;

echo -e "\e[35mWaiting for DB to initialise...\e[0m" & sleep 5;

echo -e "\e[33mMigrating DB...\e[0m"
docker exec METSCOPE-DEV-API ./node_modules/.bin/sequelize db:migrate;

echo -e "\e[1;32mStart complete\e[0m"