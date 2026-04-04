import {render} from "./before-dawn-editor/main.js";

import {personSample} from "./samples/person.js";
import {matrixSample} from "./samples/matrix.js";
import {arraySample} from "./samples/array.js";
import {usersSample} from "./samples/users.js";

const toContext = (sample, name) => {
    return {
        name,
        schema: sample.schema,
        data: sample.data
    }
}

const contexts = [
    toContext(personSample, "person"),
    toContext(matrixSample, "matrix"),
    toContext(arraySample, "array"),
    toContext(usersSample, "users")
];

document
    .getElementById("personSample")
    .addEventListener("click", (e) => {
        e.preventDefault();
        renderSample(0);
    });
document
    .getElementById("matrixSample")
    .addEventListener("click", (e) => {
        e.preventDefault();
        renderSample(1);
    });
document
    .getElementById("arraySample")
    .addEventListener("click", (e) => {
        e.preventDefault();
        renderSample(2);
    });
document
    .getElementById("usersSample")
    .addEventListener("click", (e) => {
        e.preventDefault();
        renderSample(3);
    });

const renderSample = (index) => {
    const ctx = contexts[index];
    if (ctx) {
        ctx.path = [];
        ctx.saveContext = (obj) => {
            console.log("saveContext", obj);
            console.log("saveContext", "serialized", JSON.stringify(obj));
        };
        ctx.publishData = (obj) => {
            console.log("publishData", obj);
            console.log("publishData", "serialized", JSON.stringify(obj));
        };
        ctx.onContextChange = (path) => {
            const editor = document.getElementById("temp-search-path");
            if (editor) {
                const val = path.reduce((acc, item) => acc + " / " + item, "");
                editor.value = val;
            }
        };
        render(ctx);
        document
            .getElementById("temp-do-search")
            .addEventListener("click", (e) => {
                const editor = document.getElementById("temp-search-path");
                if (editor && ctx.goToPath) {
                    ctx.goToPath(editor.value);
                }
            });
    }
}