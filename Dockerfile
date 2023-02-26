FROM node:19-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./ ./
RUN npm install --global pm2
RUN npm install --production
RUN npm run build

EXPOSE 3000

USER node
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]

