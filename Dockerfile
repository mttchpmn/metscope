FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
USER node
COPY --chown=node:node . .
EXPOSE 3000
CMD ["nodemon", "app.js"]

# To run container in PRODUCTION:
# docker build -t metscope-api .
# docker run --name METSCOPE-PROD --restart always -p 3000:3000 -d metscope-api

# To get inside container
# docker exec -it api /bin/sh
