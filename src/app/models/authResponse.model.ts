import { UserResponse } from '../models/userResponse.model'

export interface AuthResponse {
    token: string;
    user: UserResponse;
}