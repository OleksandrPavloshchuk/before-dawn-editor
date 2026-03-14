export const matrixSample = {
    schema: {
        name: "matrix",
        type: "array",
        item: {
            type: "array",
            item: {
                type: "array",
                item: { type: "number" },
                prototype: 0
            },
            prototype: []
        },
        prototype: []
    },
    data: []
};
