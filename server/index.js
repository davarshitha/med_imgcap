import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import axios from 'axios';
import cookieParser from 'cookie-parser'
dotenv.config()
import { UserRouter } from './Routes/user.js'

const app=express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3001"],
    credentials:true
}))
app.use(cookieParser())
app.use('/auth',UserRouter)

app.post('/api/ask', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error connecting to LLM API');
    }
});

mongoose.connect('mongodb://localhost:27017/authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});

app.listen(process.env.PORT, () => {
    console.log("Server is running at " + process.env.PORT);
});