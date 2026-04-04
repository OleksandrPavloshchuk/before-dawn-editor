export const fArrayOption = (schema, prototype, name = "default") => {
    return {
        schema,
        prototype: () => typeof prototype === "function" ? prototype() : structuredClone(prototype),
        name
    };
};