import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,       // ใช้ describe, it โดยไม่ต้อง import
    environment: 'node', // รัน test ใน Node environment
    include: ['tests/**/*.test.ts'], // ไฟล์ test
  },
});