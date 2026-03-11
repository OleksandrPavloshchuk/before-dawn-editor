export const personSample = {
    name: "person",
    schema: {
        type: "struct",
        fields: {
            id: {type: "number"},
            name: {type: "text"},
            birthday: {"type": "date"},
            address: {
                type: "struct",
                fields: {
                    country: {
                        type: "staticList",
                        values: ["UA", "US", "GE", "PL"]
                    },
                    city: {type: "text"},
                    street: {type: "text"},
                    tags: {
                        type: "array",
                        item: {type: "text"}
                    },
                    field1: {
                        type: "struct",
                        fields: {
                            comment: {type: "text"}
                        }
                    },
                    field2: {
                        type: "array",
                        item: {
                            type: "struct",
                            fields: {
                                "dir": {"type": "text"}
                            }
                        }
                    }
                }
            }
        }
    },
    data:
        {
            id: "1",
            name: "John Dow",
            birthday: "2000-07-12",
            address: {
                country: "UA",
                city: "Kyiv",
                street: "Metrologichna",
                tags: [
                    "the 1st", "the 2nd", "the 3rd"
                ],
                field1: {
                    comment: "This is comment"
                },
                field2: [
                    {
                        dir: "dir-1"
                    }
                ]
            }
        }
};