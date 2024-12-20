# Node.js için temel imajı kullan
FROM node:16

# Çalışma dizinini ayarla
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/uploads /usr/src/app/encrypted /usr/src/app/decrypted

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Tüm proje dosyalarını kopyala
COPY . .

# Uygulama başlatma komutu
CMD ["npm", "start"]

# Uygulamanın çalışacağı portu aç
EXPOSE 3000
