export interface WordProgress {
    id: number;
    user_id: number;
    word_id: number;
    mastery_level: number;
    review_count: number;
    last_review_at: Date;
    next_review_at: Date;
    is_favorite: boolean;
    notes?: string;
    created_at: Date;
}

export interface CreateWordProgressDTO {
    user_id: number;
    word_id: number;
    mastery_level: number;
    notes?: string;
}