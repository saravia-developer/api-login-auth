FROM node:20-alpine

RUN apk --no-cache add mysql-client

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh
CMD ["sh", "wait-for-db.sh"]
