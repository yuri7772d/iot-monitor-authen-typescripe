export const hashToken = jest.fn((secret, payload, exp) => {
    return `mockedToken-${payload.username}`;
});
export const verifyToken = jest.fn((secret, token) => {
    if (token.startsWith('mockedToken-')) {
        const username = token.replace('mockedToken-', '');
        return { id: 1, username };
    }
    throw new Error('Invalid token');
});
