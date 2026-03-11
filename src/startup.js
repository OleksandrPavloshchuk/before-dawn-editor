import {render} from "./before-dawn-editor/main.js";

document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "Demo",
    schema: schema,
    data: data,
    root: data,
    onUpdate: (obj) => {
        console.log("onUpdate", obj);
        console.log("serialized", JSON.stringify(obj));
    }
}));

const schema = {
    type: "struct",
    fields: {
        id: {type: "number"},
        comment: {type: "staticText"},
        birthday: {type: "date"},
        thisMoment: {type: "dateTime"},
        name: {type: "text"},
        password: {type: "password"},
        readOnly: {type: "boolean"},
        type: {
            type: "staticList",
            values: ["ADMIN", "WRITER", "READER"]
        }
    }
};

const data = {
    id: 1024,
    name: "Name sample",
    readOnly: true,
    type: "ADMIN",
    birthday: "2000-06-12",
    comment: "This is comment sample",
    password: "password",
    thisMoment: "2026-11-05T17:10"
};
