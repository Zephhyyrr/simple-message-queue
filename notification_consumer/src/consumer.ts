import { PrismaClient } from '@prisma/client';
import amqp from 'amqplib';
import createClient from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new createClient(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});


const prisma = new PrismaClient();
const queue = process.env.QUEUE_NAME || 'notifications';

export async function consumeMessages() {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        const channel = await conn.createChannel();
        await channel.assertQueue(queue);

        console.log('Waiting for messages...');
        channel.consume(queue, async (msg) => {
            if (msg) {
                const message = msg.content.toString();
                console.log(`Received: ${message}`);

                await redis.set(`cache:${Date.now()}`, message); // Cache di Redis

                await prisma.notification.create({
                    data: {
                        message: message,
                        status: 'processed',
                        createdAt: new Date(),
                    },
                });
                

                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Error consuming message:', error);
    }
}
