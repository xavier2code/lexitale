"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Word } from '@/types/models/Word';

export default function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('/api/words');
        const data = await response.json();
        setWords(data.words || []); // Add fallback to empty array
      } catch (error) {
        console.error('Failed to fetch words:', error);
        setWords([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!words || words.length === 0) {
    return <div>No words found.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {words?.map((word) => (
        <Card key={word.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{word.word}</span>
              <span className="text-sm text-muted-foreground">[{word.phonetic}]</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">词性：</span>{word.part_of_speech}</p>
              <p><span className="font-medium">释义：</span>{word.definition}</p>
              <p><span className="font-medium">例句：</span>{word.example_sentence}</p>
              <p><span className="font-medium">翻译：</span>{word.translation}</p>
              <p className="text-sm text-muted-foreground">
                难度：{word.difficulty_level} | 来源：{word.source}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}