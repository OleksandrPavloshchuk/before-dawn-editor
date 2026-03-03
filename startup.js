import {initBeforeDownEditor} from "before-dawn-editor/main";

document.addEventListener('DOMContentLoaded', () => {
    const rootElem = document.getElementById("root");
    initBeforeDownEditor(rootElem, createDocumentSchema());
});

const createDocumentSchema = () => {

};