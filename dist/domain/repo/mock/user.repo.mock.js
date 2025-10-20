// Mock repository
export const mockUserRepo = {
    // mock get_by_username
    get_by_username: async (username) => {
        // ตรวจสอบ input
        if (username === 'test') {
            return { id: 1, username: 'test', password: '1234' };
        }
        // ถ้าไม่ตรง return null หรือ throw ตาม Use Case ต้องการ
        throw new Error("get_by_username invalid input");
    },
    // mock create
    create: async (username, password) => {
        if (username === 'test' && password === '1234') {
            return { id: 1 };
        }
        throw new Error("get_by_username invalid input");
    },
};
