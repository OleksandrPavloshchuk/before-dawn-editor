export const matrixSample = {
    schema: {
        name: "matrix",
        type: "base/array",
        item: {
            type: "base/array",
            item: {
                type: "base/array",
                item: { type: "base/number" },
                prototype: 0
            },
            prototype: []
        },
        prototype: []
    },
    data: []
};
