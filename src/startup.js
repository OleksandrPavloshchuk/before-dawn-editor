import { initBeforeDownEditor } from "./before-dawn-editor/main.js";

document.addEventListener('DOMContentLoaded', () => {
    const rootElem = document.getElementById("root");
    initBeforeDownEditor(rootElem, createDocumentSchema(), "Person", []);
});

const createDocumentSchema = () => (
    {
    id: "1",
    name: "John Dow",
    birthday: "30.07.2000"
});

const data = {
    id: "1",
    name: "John Dow",
    birthday: "30.07.2000",
    address: {
        country: "UA",
        city: "Kyiv",
        street: "Metrologichna 52/99"
    }
};

const schema = {
    type: "object",
    properties: {
        id: {type: "staticText"},
        name: {type: "staticText"},
        birthday: {type: "staticText"},
        address: {
            type: "object",
            properties: {
                country: {type: "staticText"},
                city: {type: "staticText"},
                street: {type: "staticText"}
            }
        }
    }
};