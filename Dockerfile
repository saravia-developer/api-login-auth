FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i -D nodemon
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
