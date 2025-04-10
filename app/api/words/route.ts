import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { Word } from '@/types/models/Word';

export async function GET(req: Request) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const { searchParams } = new URL(req.url);
        
        // 支持分页
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;
        
        // 支持搜索和过滤
        const search = searchParams.get('search');
        const difficulty = searchParams.get('difficulty');
        
        let query = sql`SELECT * FROM lexitale.words`;
        
        if (search) {
            query = sql`
                SELECT * FROM lexitale.words 
                WHERE word ILIKE ${`%${search}%`} 
                OR definition ILIKE ${`%${search}%`}
            `;
        }
        
        if (difficulty) {
            query = sql`
                ${query} 
                WHERE difficulty_level = ${parseInt(difficulty)}
            `;
        }
        
        // 添加分页
        query = sql`
            ${query} 
            ORDER BY created_at DESC 
            LIMIT ${limit} 
            OFFSET ${offset}
        `;
        
        const result = await query;
        const totalCount = await sql`SELECT COUNT(*) FROM lexitale.words`;
        
        // 将查询结果映射为 Word 类型
        const words: Word[] = result.map((row: any) => ({
            id: row.id,
            word: row.word,
            part_of_speech: row.part_of_speech,
            definition: row.definition,
            phonetic: row.phonetic,
            difficulty_level: row.difficulty_level,
            frequency_rank: row.frequency_rank,
            example_sentence: row.example_sentence,
            translation: row.translation,
            source: row.source,
            status: row.status,
            created_at: new Date(row.created_at),
            updated_at: new Date(row.updated_at)
        }));

        return NextResponse.json({
            words,
            pagination: {
                total: parseInt(totalCount[0].count),
                page,
                limit,
                totalPages: Math.ceil(parseInt(totalCount[0].count) / limit)
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch words' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const wordData: Partial<Word> = await req.json();
        
        const result = await sql`
            INSERT INTO lexitale.words (
                word, part_of_speech, definition, phonetic, 
                difficulty_level, example_sentence, translation, source
            ) VALUES (
                ${wordData.word}, 
                ${wordData.part_of_speech}, 
                ${wordData.definition}, 
                ${wordData.phonetic}, 
                ${wordData.difficulty_level}, 
                ${wordData.example_sentence}, 
                ${wordData.translation}, 
                ${wordData.source}
            ) RETURNING *
        `;
        
        // 将返回结果映射为 Word 类型
        const newWord: Word = {
            id: result[0].id,
            word: result[0].word,
            part_of_speech: result[0].part_of_speech,
            definition: result[0].definition,
            phonetic: result[0].phonetic,
            difficulty_level: result[0].difficulty_level,
            example_sentence: result[0].example_sentence,
            translation: result[0].translation,
            source: result[0].source,
            status: result[0].status,
            created_at: new Date(result[0].created_at),
            updated_at: new Date(result[0].updated_at)
        };

        return NextResponse.json({ 
            message: 'Word added successfully',
            word: newWord
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to add word' },
            { status: 500 }
        );
    }
}