import {card} from "./cards/base.js";
import {insertItemBefore, renderFrameForArrayItem} from "./cards/arrayFrame.js";
import {renderFrameForStructItem} from "./cards/structFrame.js";

export const render = (ctx) => {
    getRoot().replaceChildren();
    getRoot().appendChild(convertSchemaToComponent(ctx));
}

export const elem = (tag, attributes = {}, children = []) => {
    const result = document.createElement(tag);
    Object.entries(attributes).forEach(([name, value]) => addAttribute(result, name, value));
    children.forEach((child) => appendChild(result, child));
    return result;
};

export const div = (attributes = {}, children = []) => elem("div", attributes, children);
export const span = (attributes = {}, children = []) => elem("span", attributes, children);
export const action = (text, title, command) => span({
    "onClick": command,
    "class": "link",
    "title": title
}, [text]);

export const getByPath = (obj, path) =>
    path.reduce((acc, key) => acc?.[key], obj);

export const setByPath = (ctx, value) => {
    const path = ctx.path.slice(1).map((c) => c.name).concat(ctx.name);
    const last = path[path.length - 1];
    const parent = path.slice(0, -1)
        .reduce((acc, key) => acc?.[key], ctx.root);

    parent[last] = value;
};

// private functions

const addAttribute = (elem, name, value) => {
    if (name === "class") {
        elem.className = value;
    } else if (name.startsWith("on")) {
        const eventName = name.slice(2).toLowerCase();
        elem.addEventListener(eventName, value);
    } else {
        elem.setAttribute(name, value);
        // TODO set for checkbox only
        elem.checked = value;
    }
}

const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
        child.forEach(c => appendChild(parent, c));
    } else {
        const node = typeof child === "string"
            ? document.createTextNode(child)
            : child;
        parent.appendChild(node);
    }
};

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

    const chainDiv = div({"class": "chain"}, createCardArray(ctx));
    const areaDiv = div({"class": "area vertical-gap"}, [
        createStartDiv(ctx), chainDiv, createEndDiv(ctx)
    ]);

    return div({"class": "bde-component"}, [
        navigationDiv(ctx.path),
        titleDiv(ctx),
        areaDiv
    ]);

};

const createCardArray = (ctx) => {
    switch (ctx.schema.type) {
        case "struct":
            return structCards(ctx);
        case "array":
            return arrayCards(ctx);
        default:
            // TODO
            return ["TODO implement this"];
    }
}

const createStartDiv = (ctx) => {
    switch (ctx.schema.type) {
        case "struct":
            return div({"class": "aside right"}, [
                span({"class": "big"}, ["{"])
            ]);
        case "array":
            return div({"class": "aside right"}, [
                span({"class": "big"}, ["["]),
                insertItemBefore(0)
            ]);
        default:
            return div({}, []);
    }
}

const createEndDiv = (ctx) => {
    switch (ctx.schema.type) {
        case "struct":
            return div({"class": "aside left"}, [
                span({"class": "big"}, ["}"])
            ]);
        case "array":
            return div({"class": "aside left"}, [
                insertItemBefore(ctx.data.length),
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

const titleDiv = (ctx) => {
    const name = span({"class": "large"}, [ctx.name]);
    const children = ctx.onUpdate
        ? [name, action(
            "Show object on console",
            "",
            () => {
                ctx.onUpdate(ctx.root);
            })]
        : [name];
    return div({"class": "title vertical-gap"}, children);
}

const newPath = (ctx) => [...ctx.path, ctx];

const structCards = (ctx) => Object.entries(ctx.schema.fields)
    .map(([name, schema]) =>
        card({
            root: ctx.root,
            schema,
            name,
            path: newPath(ctx),
            data: ctx.data[name]
        }, renderFrameForStructItem));

const arrayCards = (ctx) => ctx.data
    .map((data, index) =>
        card({
            root: ctx.root,
            schema: ctx.schema.item,
            name: `${index}`,
            path: newPath(ctx),
            data,
            size: ctx.data.length
        }, renderFrameForArrayItem));

const getRoot = () => document.getElementById("root");
