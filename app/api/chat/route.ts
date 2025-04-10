import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    baseURL: process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY || ''
});

export async function POST(req: Request) {
    if (!process.env.DEEPSEEK_API_KEY) {
        return NextResponse.json(
            { error: 'DEEPSEEK_API_KEY is not configured' },
            { status: 503 }
        );
    }

    try {
        const { input } = await req.json();
        
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: input }
            ],
            model: "deepseek-chat",
            temperature: 0.7,
            max_tokens: 1000,
        });

        return NextResponse.json({ content: completion.choices[0].message.content });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch response' }, { status: 500 });
    }
}