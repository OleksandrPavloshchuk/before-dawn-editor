export const personSample = {
    schema: {
        name: "person",
        type: "struct",
        fields: [
            {
                name: "id",
                type: "number"
            },
            {   name: "firstName",
                type: "text"
            },
            {
                name: "secondName",
                type: "text"
            },
            {
                name: "birthday",
                type: "date"
            },
            {
                name: "address",
                type: "struct",
                fields: [
                    {
                        name: "country",
                        type: "staticList",
                        values: ["US", "UK", "GE", "FR", "UA", "PL"]
                    },
                    {
                        name: "city",
                        type: "text"
                    },
                    {
                        name: "street",
                        type: "text"
                    }
                ]
            },
            {
                name: "emails",
                type: "array",
                item: {
                    type: "email"
                },
                prototype: "user@name.com"
            }
        ]
    },
    data: {
        id: "1",
        firstName: "John",
        secondName: "Dow",
        birthday: "2000-07-12",
        address: {
            country: "US",
            city: "Atlanta",
            street: "Peach str. 12/14"
        },
        emails: []
    }
};