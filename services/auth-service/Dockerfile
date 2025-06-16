# --- 1. Build Stage ---
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# کپی کردن فایل‌های پکیج و نصب وابستگی‌ها
COPY package*.json ./
RUN npm install

# کپی کردن سورس کد
COPY . .

# بیلد کردن اپلیکیشن
RUN npm run build

# حذف کردن وابستگی‌های توسعه
RUN npm prune --production

# --- 2. Production Stage ---
FROM node:18-alpine

# کپی کردن وابستگی‌ها از مرحله بیلد
COPY --from=builder /usr/src/app/node_modules ./node_modules

# کپی کردن اپلیکیشن بیلد شده
COPY --from=builder /usr/src/app/dist ./dist

# تعریف دستور برای اجرای اپلیکیشن
CMD ["node", "dist/main"]