import {render} from "./before-dawn-editor/main.js";

document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "person",
    schema: schema,
    data: data
}));

const data = {
    id: "1",
    name: "John Dow",
    birthday: "30.07.2000",
    address: {
        country: "UA",
        city: "Kyiv",
        street: "Metrologichna",
        field1: {
            comment: "This is comment"
        }
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
                field1: {
                    type: "struct",
                    properties: {
                        comment: {type: "staticText"}
                    }
                }
            }
        }
    }
}