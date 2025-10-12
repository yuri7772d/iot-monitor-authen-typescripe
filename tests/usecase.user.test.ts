// tests/usecase.user.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";

import type { UserRepo } from "../src/domain/repo/user.repo";

vi.mock("../src/infra/jwt/jwt.hash.js", () => ({
  hashToken: vi.fn((secret) => `mocked_token${secret}`),
  verifyToken: vi.fn(() => ({ id: 1, username: "admin" })),
}));

import { UserUseCase } from "../src/usecase/user.usecase";

describe("UserUseCase", () => {
  let mockRepo: UserRepo;
  let usecase: UserUseCase;

  beforeEach(() => {
    const jwtconfig = { secret: "1", refreshSecret: "2" };
    // สร้าง mock สำหรับ UserRepo
    mockRepo = {
      get_by_username: vi.fn(),
      create: vi.fn(),
    };
    usecase = new UserUseCase(mockRepo, jwtconfig);
  });

  it("login success", async () => {
    // mock input & output
    (mockRepo.get_by_username as any).mockResolvedValue({
      id: 1,
      username: "admin",
      password: "1234",
    });

    const result = await usecase.login({ username: "admin", password: "1234" });
    expect(result).toEqual({
      res: { id: 1, username: "admin" },
      passport: {
        acessToken: "mocked_token1",
        refreshToken: "mocked_token2",
      },
    });

    // ตรวจสอบว่าเรียกฟังก์ชันด้วย input ถูกต้อง
    expect(mockRepo.get_by_username).toHaveBeenCalledWith("admin");
  });

  it("login error password is invalid ", async () => {
    // mock input & output
    (mockRepo.get_by_username as any).mockResolvedValue({
      id: 1,
      username: "admin",
      password: "1234",
    });

    await expect(
      usecase.login({ username: "admin", password: "123" })
    ).rejects.toThrow("Password is invalid!");

    // ตรวจสอบว่าเรียกฟังก์ชันด้วย input ถูกต้อง
    expect(mockRepo.get_by_username).toHaveBeenCalledWith("admin");
  });

    it("register success", async () => {
    // mock input & output
    (mockRepo.create as any).mockResolvedValue({
      id: 1,
    });

    const result = await usecase.register({ username: "admin", password: "1234" });
    expect(result).toEqual({
      res: { id: 1, username: "admin" },
      passport: {
        acessToken: "mocked_token1",
        refreshToken: "mocked_token2",
      },
    });

    // ตรวจสอบว่าเรียกฟังก์ชันด้วย input ถูกต้อง
    expect(mockRepo.create).toHaveBeenCalledWith("admin","1234");
  });

      it("refreshToken success", async () => {
    
    const result = await usecase.refreshToken( "mocked_token2");
    expect(result).toEqual({
      res: { id: 1, username: "admin" },
      passport: {
        acessToken: "mocked_token1",
        refreshToken: "mocked_token2",
      },
    });

    // ตรวจสอบว่าเรียกฟังก์ชันด้วย input ถูกต้อง
  //  expect(mockRepo.create).toHaveBeenCalledWith("admin","1234");
  });



});
