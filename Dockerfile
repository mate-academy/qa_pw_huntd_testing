=FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jre \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

RUN npm install -g allure-commandline --unsafe-perm=true

COPY . .

RUN npx playwright install --with-deps chromium

CMD ["npx", "playwright", "test", "--project=chromium"]