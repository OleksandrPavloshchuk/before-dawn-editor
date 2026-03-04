import { initBeforeDownEditor } from "./before-dawn-editor/main.js";

document.addEventListener('DOMContentLoaded', () => {
    const rootElem = document.getElementById("root");
    initBeforeDownEditor(rootElem, createDocumentSchema());
});

const createDocumentSchema = () => ({
    one: "two",
    three: "four",
    id: "1",
    name: "John Dow",
    salary: "0.01"
});