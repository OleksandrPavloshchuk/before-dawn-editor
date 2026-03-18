export const personSample = {
    schema: {
        name: "person",
        type: "base/struct",
        fields: [
            {
                name: "id",
                type: "base/number"
            },
            {   name: "firstName",
                type: "base/text"
            },
            {
                name: "secondName",
                type: "base/text"
            },
            {
                name: "birthday",
                type: "base/date"
            },
            {
                name: "address",
                type: "base/struct",
                fields: [
                    {
                        name: "country",
                        type: "base/staticList",
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
            },
            {
                name: "emails",
                type: "base/array",
                item: {
                    type: "base/email"
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