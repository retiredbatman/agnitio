# Common build stage
FROM node:16 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

ENV ORIGIN *
ENV CREDENTIALS true

CMD ["npm", "run", "start"]
