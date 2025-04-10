export interface Word {
    id: number;
    word: string;
    part_of_speech: string;
    definition: string;
    phonetic: string;
    difficulty_level: number;
    frequency_rank?: number;
    example_sentence: string;
    translation: string;
    source: string;
    status: 'active' | 'archived';
    created_at: Date;
    updated_at: Date;
}

export interface CreateWordDTO {
    word: string;
    part_of_speech: string;
    definition: string;
    phonetic: string;
    difficulty_level: number;
    example_sentence: string;
    translation: string;
    source: string;
}