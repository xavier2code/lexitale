import { Word } from '../models/Word';

export interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface WordsResponse {
    words: Word[];
    pagination: PaginationInfo;
}

export interface WordResponse {
    word: Word;
}