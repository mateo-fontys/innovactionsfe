FROM node:18-alpine AS build

WORKDIR /innovactions_frontend

COPY . .

RUN npm install

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
