# ---- deps ----
FROM node:20-bookworm AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---- build ----
FROM deps AS build
WORKDIR /app
COPY . .
# expects: "build": "tsc -p tsconfig.json" and outputs to dist/
RUN npm run build

# ---- run ----
FROM node:20-bookworm AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3001
CMD ["node", "dist/index.js"]