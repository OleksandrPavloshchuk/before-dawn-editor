import {cardWithTitle} from "./cards/base.js";
import {insertItemBefore, renderFrameForArrayItem} from "./cards/arrayFrame.js";
import {renderFrameForStructItem} from "./cards/structFrame.js";

export const render = (args) => {
    getRoot().replaceChildren();
    getRoot().appendChild(convertSchemaToComponent(args));
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

export const setByPath = (obj, path, value) => {
    const last = path[path.length - 1];
    const parent = path.slice(0, -1)
        .reduce((acc, key) => acc?.[key], obj);

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

const convertSchemaToComponent = (args) => {
    if (!args || !args.schema) {
        raiseError("No schema of data");
        return;
    }

    const chainDiv = div({"class": "chain"}, createCardArray(args));
    const areaDiv = div({"class": "area vertical-gap"}, [
        createStartDiv(args), chainDiv, createEndDiv(args)
    ]);

    return div({"class": "bde-component"}, [
        navigationDiv(args.path),
        titleDiv(args),
        areaDiv
    ]);

};

const createCardArray = (args) => {
    switch (args.schema.type) {
        case "struct":
            return structCards(args);
        case "array":
            return arrayCards(args);
        default:
            // TODO
            return ["TODO implement this"];
    }
}

const createStartDiv = (args) => {
    switch (args.schema.type) {
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

const createEndDiv = (args) => {
    switch (args.schema.type) {
        case "struct":
            return div({"class": "aside left"}, [
                span({"class": "big"}, ["}"])
            ]);
        case "array":
            return div({"class": "aside left"}, [
                insertItemBefore(args.data.length),
                span({"class": "big"}, ["]"])
            ]);
        default:
            return div({}, []);
    }
}


const navigationDiv = (path) => {
    const toSpan = (args) =>
        span({"onClick": () => render(args), "class": "item link"},
            [args.name]);
    return div({"class": "navigation vertical-gap"}, path.map(toSpan));
}

const titleDiv = (args) => {
    const doUpdate = action(
        "Show object on console",
        "",
        () => {args.onUpdate(args.root);});
    return div({"class": "title vertical-gap"}, [
        span({"class": "large"}, [args.name]),
        doUpdate]);
}

const newPath = (args) => [...args.path, args];

const structCards = (args) => Object.entries(args.schema.properties)
    .map(([name, schema]) =>
        cardWithTitle({
            root: args.root,
            schema,
            name,
            path: newPath(args),
            data: args.data[name],
            onUpdate: args.onUpdate
        }, renderFrameForStructItem));

const arrayCards = (args) => args.data
    .map((data, index) =>
        cardWithTitle({
            root: args.root,
            schema: args.schema.item,
            name: `${index}`,
            path: newPath(args),
            data,
            size: args.data.length,
            onUpdate: args.onUpdate
        }, renderFrameForArrayItem));

const getRoot = () => document.getElementById("root");
