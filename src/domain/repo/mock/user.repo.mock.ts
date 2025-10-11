import { UserEntity } from "../../entities/user.js"; 
import { UserRepo } from "../user.repo.js"; 

// Mock repository
export const mockUserRepo: UserRepo = {
  // mock get_by_username
  get_by_username: async (username: string) => {
    // ตรวจสอบ input
    if (username === 'test') {
      return { id: 1, username: 'test', password: '1234' } as UserEntity;
    }
    // ถ้าไม่ตรง return null หรือ throw ตาม Use Case ต้องการ
     throw new Error("get_by_username invalid input");
    
  },

  // mock create
  create: async (username: string, password: string) => {

    if (username === 'test' && password  === '1234') {
      return { id: 1 };
    }

    throw new Error("get_by_username invalid input");
  },
};