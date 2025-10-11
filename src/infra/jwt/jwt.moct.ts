export const hashToken = jest.fn((secret: string, payload: any, exp: number) => {
  return `mockedToken-${payload.username}`;
});

export const verifyToken = jest.fn((secret: string, token: string) => {
  if (token.startsWith('mockedToken-')) {
    const username = token.replace('mockedToken-', '');
    return { id: 1, username };
  }
  throw new Error('Invalid token');
});