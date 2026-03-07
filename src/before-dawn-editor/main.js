import {card, cardWithTitle} from "./cards/base.js";
import {insertItemAfter, insertItemBefore, renderFrameForArrayItem} from "./cards/arrayFrame.js";
import {renderFrameForStructItem} from "./cards/structFrame.js";

export const render = (args) => {
    getRoot().replaceChildren();
    getRoot().appendChild(convertSchemaToControl(args));
}

export const elem = (tag, attributes = {}, children = []) => {
    const result = document.createElement(tag);
    Object.entries(attributes).forEach(([name, value]) => addAttribute(result, name, value));
    children.forEach((child) => appendChild(result, child));
    return result;
};

export const div = (attributes = {}, children = []) => elem("div", attributes, children);
export const span = (attributes = {}, children = []) => elem("span", attributes, children);
export const action = (text, command) => elem("span", {"onClick": command}, [text]);

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

const convertSchemaToControl = (args) => {
    if (!args || !args.schema) {
        raiseError("No schema of data");
        return;
    }
    return div({"class": "bde-root"}, [
        pathDiv(args.path),
        headerDiv(args.name),
        div({"class": "bde-field"}, createCardArray(args))
    ]);

};

const createCardArray = (args) => {
    switch (args.schema.type) {
        case "struct": return structCards(args);
        case "array": return arrayCards(args);
        default:
            // TODO
            return ["TODO implement this"];
    }
}

const pathDiv = (path) => {
    const toSpan = (args) =>
        span({"onClick": () => render(args), "class": "bde-back"},
            [args.name]);
    return div({"class": "bde-path"}, path.map(toSpan));
}

const headerDiv = (name) => div({"class": "bde-header"}, [name]);

const structCards = (args) => {
    const path = [...args.path, args];
    const schemaChildren = Object.entries(args.schema.properties)
        .map(([name, schema]) => cardWithTitle(
            {schema, name, path, data: args.data[name]}, renderFrameForStructItem));
    return [staticCard("{"), ...schemaChildren, staticCard("}")];
};

const arrayCards = (args) => {
    const path = [...args.path, args];
    const schema = args.schema.item;
    const arrayChildren = args.data
        .map((data, index) => cardWithTitle(
            {schema, name: `${index}`, path, data, size: args.data.length}, renderFrameForArrayItem));
    return [arrayStartCard(), ...arrayChildren, arrayEndCard(arrayChildren.length)];
};

const arrayStartCard = () => card([
    span({"class": "bde-big"}, ["["]),
    insertItemBefore(0)
]);

const arrayEndCard = (size) => card([
    insertItemAfter(size-1),
    span({"class": "bde-big"}, ["]"])
]);

const staticCard = (text) => card([span({"class": "bde-big"}, [text])]);

const getRoot = () => document.getElementById("root");
