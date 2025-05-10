import Redis from 'ioredis';
import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const redisPort = Number(process.env.REDIS_PORT) || 6379;
const redisHost = process.env.REDIS_HOST || 'localhost';
const queue = process.env.QUEUE_NAME || 'notifications';

// Gunakan global instance agar Redis tidak duplikat
let redis: Redis;
declare global {
    var redisInstance: Redis | undefined;
}
if (!global.redisInstance) {
    global.redisInstance = new Redis({
        host: redisHost,
        port: redisPort,
    });
}
redis = global.redisInstance;

export async function publishMessage(message: string) {
    try {
        // Simpan pesan di Redis (caching)
        await redis.set(`msg:${Date.now()}`, message);

        // Koneksi ke RabbitMQ
        const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const channel = await conn.createChannel();
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message));

        console.log(`✅ Message sent to RabbitMQ: ${message}`);

        // Tutup koneksi agar tidak bocor
        setTimeout(() => {
            channel.close();
            conn.close();
        }, 500);
    } catch (error) {
        console.error('❌ Error publishing message:', error);
    }
}
