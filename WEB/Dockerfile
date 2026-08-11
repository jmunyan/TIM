# syntax=docker/dockerfile:1

# TIM web front end (Expo / React Native Web).
#
# Two targets:
#   dev    (default) - Expo + Metro dev server on 8081, same as `npm start`
#   static           - `expo export` output served by nginx on 80
#
# Build and run by hand:
#   docker build -t tim-web ./WEB
#   docker run --rm -p 8081:8081 tim-web
# Or use docker-compose.yml at the repo root to bring up the API and web together.

ARG NODE_VERSION=22

# ---- deps: install node modules once, shared by the dev and build stages ----
FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /web
ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false
COPY package.json package-lock.json ./
RUN npm ci

# ---- dev: Metro dev server, hot reload when /web is bind mounted ----
FROM deps AS dev
# BROWSER=none stops the CLI trying to launch a browser inside the container --
# the browser runs on the host. Do NOT set CI here: CI mode puts Metro in
# no-watch mode and disables reloads.
ENV BROWSER=none \
    EXPO_NO_TELEMETRY=1
COPY . .
EXPOSE 8081
CMD ["npx", "expo", "start", "--web", "--host", "lan", "--port", "8081"]

# ---- build: static web export ----
FROM deps AS build
ENV CI=1 \
    EXPO_NO_TELEMETRY=1
COPY . .
RUN npx expo export --platform web --output-dir dist

# ---- static: production-ish image, no Node at runtime ----
FROM nginx:1.27-alpine AS static
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /web/dist /usr/share/nginx/html
EXPOSE 80
