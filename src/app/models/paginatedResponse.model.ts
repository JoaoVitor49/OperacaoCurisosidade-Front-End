export interface PaginatedResponse<T> {
    total: number;
    results: T[];
}