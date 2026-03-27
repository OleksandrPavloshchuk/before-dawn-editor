export const field = (type, name = undefined, extra = {}) => ({
    type,
    ...(name !== undefined ? { name } : {}),
    ...extra
});