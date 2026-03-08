import {render} from "./before-dawn-editor/main.js";

document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "person",
    schema: schema,
    data: data,
    root: data,
    onUpdate: (obj) => { console.log("onUpdate", obj);}
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
                type: "text"
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
    fields: {
        id: {type: "text"},
        name: {type: "text"},
        birthday: {type: "text"},
        address: {
            type: "struct",
            fields: {
                country: {type: "text"},
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
                            dir: {type: "text"}
                        }
                    }
                }
            }
        }
    }
}