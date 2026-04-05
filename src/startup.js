import {render} from "./before-dawn-editor/main.js";

import {personSample} from "./samples/person.js";
import {matrixSample} from "./samples/matrix.js";
import {arraySample} from "./samples/array.js";
import {usersSample} from "./samples/users.js";
import {pageAsideReal} from "./samples/real-simple.js";
import {selectArrayItem} from "./before-dawn-editor/fields/base/array.js";

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
    toContext(usersSample, "users"),
    toContext(pageAsideReal, "pageAside")
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
document
    .getElementById("pageAside")
    .addEventListener("click", (e) => {
        e.preventDefault();
        renderSample(4);
    });

// TODO find better solution than storing in global variable
let arrayPos;
let currentCtx;

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
        ctx.setArrayOptions = (aCtx, options, pos) => {
            currentCtx = aCtx;
            arrayPos = pos;
            const select = document.getElementById("temp-select-array-option");
            if (select) {
                select.replaceChildren();
                options.forEach((item) => {
                    const option = document.createElement("option");
                    option.appendChild(document.createTextNode(item));
                    option.setAttribute("value", item);
                    select.appendChild(option);
                });
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
        document
            .getElementById("temp-do-select-array-option")
            .addEventListener("click", (e) => {
                const select = document.getElementById("temp-select-array-option");
                if (select && select.firstChild && selectArrayItem) {
                    selectArrayItem(currentCtx, select.value, arrayPos);
                    select.replaceChildren();
                    arrayPos = undefined;
                    currentCtx = undefined;
                }
            });
    }
}