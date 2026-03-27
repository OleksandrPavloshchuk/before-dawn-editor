import {addressField} from "../cutom_fields/address.js";

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
            addressField("mainAddress"),
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
        mainAddress: {
            country: "US",
            city: "Atlanta",
            street: "Peach str. 12/14"
        },
        emails: []
    }
};