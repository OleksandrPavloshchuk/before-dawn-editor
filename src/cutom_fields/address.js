export const addressField = (name) => {
    return {
        name,
        type: "base/struct",
        fields: [
            {
                name: "country",
                type: "base/staticSelect",
                values: ["US", "UK", "GE", "FR", "UA", "PL"]
            },
            {
                name: "city",
                type: "base/text"
            },
            {
                name: "street",
                type: "base/text"
            }
        ]
    }
};