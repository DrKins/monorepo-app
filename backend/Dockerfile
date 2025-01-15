# Production Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build # If a build script exists

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
