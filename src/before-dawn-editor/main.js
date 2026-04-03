import {card} from "./card.js";
import {div, getRoot, span} from "./dom.js";
import {getField, getFieldRenderer, registerFields} from "./fieldsRegistry.js";
import {titleDiv} from "./title.js";

export const render = (ctx) => {
    registerFields();
    getRoot().replaceChildren();
    getRoot().appendChild(convertSchemaToComponent(ctx));

    ctx.onContextChange(getPath(ctx));

    ctx.goToPath = (pathStr) => goTo(ctx, pathStr);
}

export const setByPath = (ctx, value) => {
    const path = ctx.path
        .slice(1)
        .map((c) => c.name).concat(ctx.name);
    const last = path[path.length - 1];
    const rootCtx = getRootCtx(ctx);
    const parent = path
        .slice(0, -1)
        .reduce((acc, key) => acc?.[key], rootCtx.data);
    parent[last] = value;
};

export const convertContextsToCards = (contexts, render) => contexts.map((ctx) => card(ctx, render));

export const newPath = (ctx) => [...ctx.path, ctx];

export const getRootCtx = (ctx, visited = new Set()) => {
    if (visited.has(ctx)) {
        throw new Error("Cyclic context detected");
    }
    visited.add(ctx);
    return (!ctx.parent) ? ctx : getRootCtx(ctx.parent, visited);
}

export async function resolveNode(node) {

    if (node._substitute === "restOnPublish") {
        const res = await fetch(node._endpoint);
        let data = await res.json();
        if (node._path) {
            data = resolvePath(data, node._path);
        }
        return data.slice(0, node._limit);
    }

    if (Array.isArray(node)) {
        return Promise.all(node.map(resolveNode));
    }

    if (typeof node === "object") {
        const entries = await Promise.all(
            Object.entries(node).map(async ([k, v]) => [k, await resolveNode(v)])
        );

        return Object.fromEntries(entries);
    }

    return node;
}

// private functions

const resolvePath = (obj, path) => {
    if (!path) {
        return obj;
    }

    return path
        .split(".")
        .reduce((acc, key) => {
            if (acc == null) {
                return undefined;
            }
            return acc[key];
        }, obj);
};

const goTo = (ctx, pathStr) => {
    try {
        const arr = pathStr.split("/").map(s => s.trim()).filter(Boolean);
        let tempCtx;
        for (let i = 0; i < arr.length; i++) {
            if (i === 0) {
                tempCtx = getRootCtx(ctx);
            } else {
                const field = getField(tempCtx.schema.type);
                if (!field) {
                    tempCtx = undefined;
                    break;
                }
                tempCtx = field.createChildCtxByName(tempCtx, arr[i]);
                if (!tempCtx) {
                    break;
                }
            }
        }
        if (tempCtx) {
            render(tempCtx);
        } else {
            throw new Error("No nontext");
        }
    } catch (e) {
        raiseError(e);
    }
}

const getPath = (ctx) => {
    const path = [];
    let current = ctx;

    while (current) {
        path.unshift(current.name);
        current = current.parent;
    }

    return path;
}

const raiseError = (error) => {
    console.log("ERROR", error);
    // TODO use another approach ... maybe
    const elemError = div({"class":"error"}, [error.toString()]);
    getRoot().replaceChildren();
    getRoot().appendChild(elemError);
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

const createCardArray = (ctx) => {
    const renderer = getFieldRenderer(ctx.schema.type, "desk");
    if (renderer) {
        return renderer(ctx);
    }
    throw new Error(`No card array renderer for "${ctx.schema.type}"`)
}

const navigationDiv = (path) => {
    const toSpan = (ctx) =>
        span({"onClick": () => render(ctx), "class": "item link"},
            [ctx.name]);
    return div({"class": "navigation vertical-gap"}, path.map(toSpan));
}