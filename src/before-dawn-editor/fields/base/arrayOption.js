export const fArrayOption = (schema, prototype, name = "default") => {
    return {
        schema,
        prototype: () => prototype,
        name
    };
};