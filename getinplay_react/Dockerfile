FROM node:23-alpine3.20
WORKDIR /getinplay_react
COPY package*.json ./
RUN npm ci
COPY . .
ENV VITE_API_URL="http://192.168.0.82:5001"
RUN npm run build

FROM nginx:1.27.4-alpine-slim
COPY --from=0 /getinplay_react/dist /dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
