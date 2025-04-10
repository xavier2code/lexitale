export interface WordTag {
    id: number;
    word_id: number;
    tag_name: string;
    created_at: Date;
}

export interface CreateWordTagDTO {
    word_id: number;
    tag_name: string;
}