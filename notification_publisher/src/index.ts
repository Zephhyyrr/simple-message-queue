import express, { Request, Response } from 'express';
import cors from 'cors';
import { publishMessage } from './publisher';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send', async (req: Request, res: Response): Promise<void> => {
    const { message } = req.body;
    if (!message) {
        res.status(400).json({ error: 'Message is required' });
        return;
    }

    await publishMessage(message);
    res.json({ success: true, message });
});


const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`Publisher running on: http://${HOST}:${PORT}`);
});

