# 📌 Notification Queue System

Sistem ini menggunakan **RabbitMQ**.  
- **notification_publisher** bertugas mengirim pesan ke queue.  
- **notification_consumer** bertugas mengambil dan memproses pesan dari queue.  

---

## 🛠 Requirements

Pastikan kamu sudah menginstal software berikut sebelum menjalankan proyek ini:

1. **Node.js** (≥ 18.0.0) → [Download](https://nodejs.org/en/download/)
2. **RabbitMQ** → [Download](https://www.rabbitmq.com/download.html)
3. **PostgreSQL** → [Download](https://www.postgresql.org/download/)
4. **Redis** → [Download](https://redis.io/download/)

---

## 🚀 Cara Menjalankan Proyek

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Zephhyyrr/simple-message-queue
cd simple-message-queue

```

2️⃣ Konfigurasi Environment
Buat file .env di masing-masing folder (notification_publisher dan notification_consumer) dengan isi sebagai berikut:

.env untuk notification_publisher
```bash
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
RABBITMQ_URL=amqp://localhost
QUEUE_NAME=notifications
PORT=3001
```

.env untuk notification_consumer
```bash
POSTGRES_URL="postgresql://username:password@localhost:5432/simple-message-queue"
REDIS_URL=redis://127.0.0.1:6379
RABBITMQ_URL=amqp://localhost
QUEUE_NAME=notifications
```

3️⃣ Instal Dependensi
Jalankan perintah berikut di masing-masing folder notification_publisher dan notification_consumer:

```bash
npm install
```

4️⃣ Jalankan RabbitMQ, PostgreSQL, dan Redis
Pastikan RabbitMQ, PostgreSQL, dan Redis sudah berjalan sebelum menjalankan proyek.

5️⃣ Menjalankan Publisher
Jalankan di terminal:
```bash
cd notification_publisher
npm run dev
```

6️⃣ Menjalankan Consumer
Buka terminal baru dan jalankan:
```bash
cd notification_consumer
npm run dev
```
📜 Cara Kerja Sistem
notification_publisher mengirim pesan ke RabbitMQ.
notification_consumer mengambil pesan dari RabbitMQ, menyimpannya di PostgreSQL, dan meng-cache di Redis.
Pesan yang telah diproses ditandai sebagai processed di database.

🎯 Struktur Proyek
```bash
tugas_message_queue/
│── notification_publisher/
│   ├── src/
│   │   ├── index.ts
│   │   ├── publisher.ts
│   ├── package.json
│   ├── .env
│
│── notification_consumer/
│   ├── src/
│   │   ├── index.ts
│   │   ├── consumer.ts
│   ├── package.json
│   ├── .env
│
└── README.md
```

#**IMPORTANT: Pastikan Redis dan RabbitMQ Berjalan dengan perintah :**  

Menjalankan Redis:  
```bash
redis-server
```

Menjalankan RabbitMQ:
```bash
rabbitmq-server
```
