# =========================
# 1. BUILD STAGE
# =========================
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY src ./src

RUN npm run build


# =========================
# 2. PRODUCTION STAGE
# =========================
FROM node:22-bookworm-slim AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# solo traemos el build compilado
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]