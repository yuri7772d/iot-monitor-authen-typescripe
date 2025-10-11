import { UserEntity } from "../entities/user.js";

export interface UserRepo {
    get_by_username(username: string): Promise<UserEntity> ;
    create(username: string, password: string): Promise<{ id: number }> ;
}