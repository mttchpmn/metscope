FROM node:10-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD ["nodemon", "app.js"]

# To run container:
# docker build -t mttchpmn/metscope .
# docker run --name api --restart always -p 3000:3000 -d mttchpmn/metscope

# To get inside container
# docker exec -it api /bin/sh
