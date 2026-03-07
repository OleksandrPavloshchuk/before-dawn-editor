import {render} from "./before-dawn-editor/main.js";

document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "person",
    schema: schema,
    data: data
}));

/*
const data = [
    [
        [ "1.1.1", "1.1.2" ],
        [ "1.2.1", "1.2.2" ]
    ],
    [
        [ "2.1.1", "2.1.2" ],
        [ "2.2.1", "2.2.2" ]
    ]
];

const schema = {
    type: "array",
    item: {
        type: "array",
        item: {
            type: "array",
            item: {
                type: "staticText"
            }
        }
    }
};
*/


const data = {
    id: "1",
    name: "John Dow",
    birthday: "30.07.2000",
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
};

const schema = {
    type: "struct",
    properties: {
        id: {type: "staticText"},
        name: {type: "staticText"},
        birthday: {type: "staticText"},
        address: {
            type: "struct",
            properties: {
                country: {type: "staticText"},
                city: {type: "staticText"},
                street: {type: "staticText"},
                tags: {
                    type: "array",
                    item: {type: "staticText"}
                },
                field1: {
                    type: "struct",
                    properties: {
                        comment: {type: "staticText"}
                    }
                },
                field2: {
                    type: "array",
                    item: {
                        type: "struct",
                        properties: {
                            dir: {type: "staticText"}
                        }
                    }
                }
            }
        }
    }
}