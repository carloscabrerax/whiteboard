# server/Dockerfile
FROM node:20-bookworm AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY . .
# expects "tsc" configured; outputs to dist/
RUN npm run build

FROM node:20-bookworm AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# Optional: drop privileges
USER node
EXPOSE 3001
CMD ["node", "dist/index.js"]
