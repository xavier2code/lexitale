'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Deepseek() {
    const [input, setInput] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });

            if (!res.ok) throw new Error('Failed to fetch response');

            const data = await res.json();
            setResponse(data.content);
        } catch (err) {
            setError(err instanceof Error ? err.message : '发生未知错误');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="输入您的问题..."
                    className="min-h-[100px]"
                />
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-black hover:bg-black/90 text-white"
                >
                    {loading ? '生成中...' : '发送'}
                </Button>
            </form>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {response && (
                <Alert>
                    <AlertDescription className="whitespace-pre-wrap">
                        {response}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}