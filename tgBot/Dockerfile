FROM node:18-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install 

RUN npm install -g nodemon

COPY . .

# COPY ./dist ./dist

CMD ["npm", "run", "dev"]