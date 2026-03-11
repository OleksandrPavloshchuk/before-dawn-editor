export const matrixSample = {
    name: "matrix",
    schema: {
        type: "array",
        item: {
            type: "array",
            item: {
                type: "array",
                item: { type: "number" }
            }
        }
    },
    data: [
        [
            [111, 112],
            [121, 122]
        ],
        [
            [211, 212],
            [221, 222]
        ]
    ]
};
