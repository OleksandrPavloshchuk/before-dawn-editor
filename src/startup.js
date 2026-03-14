import {render} from "./before-dawn-editor/main.js";

import {personSample} from "./samples/person.js";
import {matrixSample} from "./samples/matrix.js";
import {arraySample} from "./samples/array.js";

const toContext = (sample) => {
    return {
        name: sample.schema.name,
        schema: sample.schema,
        data: sample.data,
        root: sample.data
    }
}

const contexts = [
    toContext(personSample),
    toContext(matrixSample),
    toContext(arraySample)
];

document
    .getElementById("personSample")
    .addEventListener( "click", (e) => {
        e.preventDefault();
        renderSample(0);
    });
document
    .getElementById("matrixSample")
    .addEventListener( "click", (e) => {
        e.preventDefault();
        renderSample(1);
    });
document
    .getElementById("arraySample")
    .addEventListener( "click", (e) => {
        e.preventDefault();
        renderSample(2);
    });

const renderSample = (index) => {
    const ctx = contexts[index];
    if (ctx) {
        ctx.path = [];
        ctx.onUpdate = (obj) => {
            console.log("onUpdate", obj);
            console.log("serialized", JSON.stringify(obj));
        };
        render(ctx);
    }
}