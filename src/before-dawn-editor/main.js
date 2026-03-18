import {card} from "./cards/base.js";
import {insertItemAfter, insertItemBefore, renderFrameForArrayItem} from "./cards/arrayFrame.js";
import {renderFrameForStructItem} from "./cards/structFrame.js";
import {action, div, getRoot, span} from "./dom.js";
import {registerFields} from "./fieldsRegistry.js";

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

    const middleDiv = div({"class": "chain"}, createCardArray(ctx));
    // TODO generate the unique ID
    const areaDiv = div({"class": "area vertical-gap", "id": "control-area"}, [
        createStartDiv(ctx), middleDiv, createEndDiv(ctx)
    ]);

    return div({"class": "bde-component"}, [
        navigationDiv(ctx.path),
        titleDiv(ctx),
        areaDiv
    ]);

};

const createCardArray = (ctx) => {
    switch (ctx.schema.type) {
        case "base/struct":
            return structCards(ctx);
        case "base/array":
            return arrayCards(ctx);
        default:
            // TODO
            return ["TODO implement this"];
    }
}

const createStartDiv = (ctx) => {
    switch (ctx.schema.type) {
        case "base/struct":
            return div({"class": "aside right"}, [
                span({"class": "big"}, ["{"])
            ]);
        case "base/array":
            return div({"class": "aside right"}, [
                span({"class": "big"}, ["["]),
                insertItemBefore(ctx, 0)
            ]);
        default:
            return div({}, []);
    }
}

const createEndDiv = (ctx) => {
    switch (ctx.schema.type) {
        case "base/struct":
            return div({"class": "aside left"}, [
                span({"class": "big"}, ["}"])
            ]);
        case "base/array":
            return div({"class": "aside left"}, [
                insertItemAfter(ctx, ctx.data.length - 1),
                span({"class": "big"}, ["]"])
            ]);
        default:
            return div({}, []);
    }
}

const navigationDiv = (path) => {
    const toSpan = (ctx) =>
        span({"onClick": () => render(ctx), "class": "item link"},
            [ctx.name]);
    return div({"class": "navigation vertical-gap"}, path.map(toSpan));
}

function titleWithNavigation(ctx) {
    const name = span({"class": "large"}, [ctx.name]);
    const titleWithNavigation = [];
    if (ctx.left) {
        const leftAction = action(
            ctx.left.name,
            "",
            () => render(ctx.left));
        titleWithNavigation.push(leftAction);
    }
    titleWithNavigation.push(name);
    if (ctx.right) {
        const rightAction = action(
            ctx.right.name,
            "",
            () => render(ctx.right));
        titleWithNavigation.push(rightAction);
    }
    return titleWithNavigation;
}

const titleDiv = (ctx) => {
    const children = [];
    children.push(div({}, [titleWithNavigation(ctx)]));
    if (ctx.onUpdate) {
        const showObjectAction = action(
            "Show object on console",
            "",
            () => ctx.onUpdate(ctx.root));
        children.push(showObjectAction);
    }
    return div({"class": "title vertical-gap"}, children);
}

const newPath = (ctx) => [...ctx.path, ctx];

const structCards = (ctx) => {
    const ctxs = ctx.schema.fields
        .map((field) => {
            return {
                root: ctx.root,
                schema: field,
                name: field.name,
                path: newPath(ctx),
                data: ctx.data[field.name]
            }
        });
    return convertCtxsToCard(ctxs, renderFrameForStructItem);
};

const arrayCards = (ctx) => {
    const ctxs = ctx.data
        .map((data, index) => {
            return {
                root: ctx.root,
                schema: ctx.schema.item,
                name: `${index}`,
                path: newPath(ctx),
                data,
                size: ctx.data.length
            }
        });
    return convertCtxsToCard(ctxs, renderFrameForArrayItem);
}

const convertCtxsToCard = (ctxs, render) => {
    return ctxs.map((ctx, index) => {
        if (isComplex(ctx)) {
            const leftCtx = findClosedLeftComplexCtx(ctxs, index);
            if (leftCtx) {
                ctx.left = leftCtx;
            }
            const rightCtx = findClosedRightComplexCtx(ctxs, index);
            if (rightCtx) {
                ctx.right = rightCtx;
            }
        }
        return card(ctx, render);
    });
};

const findClosedLeftComplexCtx = (ctxs, index) => {
    for (let i = index - 1; i >= 0; i--) {
        const ctx = ctxs[i];
        if (isComplex(ctx)) {
            return ctx;
        }
    }
    return undefined;
};

const findClosedRightComplexCtx = (ctxs, index) => {
    for (let i = index + 1; i < ctxs.length; i++) {
        const ctx = ctxs[i];
        if (isComplex(ctx)) {
            return ctx;
        }
    }
    return undefined;
};

const isComplex = (ctx) => ctx.schema.type === "base/struct" || ctx.schema.type === "base/array";
