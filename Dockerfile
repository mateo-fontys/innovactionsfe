FROM node:23-alpine3.20 AS build

WORKDIR /innovactions_frontend

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY --from=build innovactions_frontend/dist/innovactions_frontend/browser /usr/share/nginx/html

EXPOSE 80
