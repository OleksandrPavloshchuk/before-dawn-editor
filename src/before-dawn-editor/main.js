import {card} from "./cards/base.js";
import {div, getRoot, span} from "./dom.js";
import {getField, getFieldRenderer, isComposite, registerFields} from "./fieldsRegistry.js";
import {titleDiv} from "./title.js";

export const render = (ctx) => {
    registerFields();
    getRoot().replaceChildren();
    getRoot().appendChild(convertSchemaToComponent(ctx));
}

export const getByPath = (obj, path) =>
    path.reduce((acc, key) => acc?.[key], obj);

export const setByPath = (ctx, value) => {
    const path = ctx.path
        .slice(1)
        .map((c) => c.name).concat(ctx.name);
    const last = path[path.length - 1];
    const parent = path
        .slice(0, -1)
        .reduce((acc, key) => acc?.[key], ctx.root);
    parent[last] = value;
};

export const convertContextsToCards = (contexts, render) => contexts.map((ctx, index) => {
    if (isComposite(ctx.schema.type)) {
        const leftCtx = findClosedLeftComplexCtx(contexts, index);
        if (leftCtx) {
            ctx.left = leftCtx;
        }
        const rightCtx = findClosedRightComplexCtx(contexts, index);
        if (rightCtx) {
            ctx.right = rightCtx;
        }
    }
    return card(ctx, render);
});

export const newPath = (ctx) => [...ctx.path, ctx];

// private functions

const raiseError = (error) => {
    // TODO show error
    alert(error);
    console.log("ERROR", error);
}

const convertSchemaToComponent = (ctx) => {
    if (!ctx || !ctx.schema) {
        raiseError("No schema of data");
        return;
    }

    const deskChildren = [];
    const field = getField(ctx.schema.type);

    if (field.chainBegin) {
        deskChildren.push(field.chainBegin(ctx));
    }
    deskChildren.push(div({"class": "chain"}, createCardArray(ctx)));
    if (field.chainEnd) {
        deskChildren.push(field.chainEnd(ctx));
    }

    const deskDiv = div({"class": "desk vertical-gap", "id": "control-desk"}, [deskChildren]);

    return div({"class": "bde-component"}, [
        navigationDiv(ctx.path),
        titleDiv(ctx),
        deskDiv
    ]);

};

const createCardArray = (ctx) => getFieldRenderer(ctx.schema.type, "desk")(ctx);

const navigationDiv = (path) => {
    const toSpan = (ctx) =>
        span({"onClick": () => render(ctx), "class": "item link"},
            [ctx.name]);
    return div({"class": "navigation vertical-gap"}, path.map(toSpan));
}


const findClosedLeftComplexCtx = (contexts, index) => {
    for (let i = index - 1; i >= 0; i--) {
        const ctx = contexts[i];
        if (isComposite(ctx.schema.type)) {
            return ctx;
        }
    }
    return undefined;
};

const findClosedRightComplexCtx = (contexts, index) => {
    for (let i = index + 1; i < contexts.length; i++) {
        const ctx = contexts[i];
        if (isComposite(ctx.schema.type)) {
            return ctx;
        }
    }
    return undefined;
};

