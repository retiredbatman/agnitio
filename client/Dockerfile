# Common build stage
FROM node:16 as common-build-stage

ENV NODE_ENV production

COPY . ./app


WORKDIR /app

RUN npm ci

COPY . ./

RUN npm run build


# Production build stage
FROM nginx:stable-alpine

COPY --from=common-build-stage /app/build /usr/share/nginx/html
COPY --from=common-build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
