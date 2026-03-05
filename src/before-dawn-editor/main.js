import {card, namedCard} from "./cards/base.js";

export const initBeforeDownEditor = (rootElem, schema, name, path = []) =>
    rootElem.appendChild(convertSchemaToElem(schema, name, path));

export const elem = (tag, attributes = {}, children = []) => {
    const result = document.createElement(tag);
    Object.entries(attributes).forEach(([name, value]) => addAttribute(result, name, value));
    children.forEach( (child) => appendChild(result, child));
    return result;
};

export const div = ( attributes = {}, children = []) => elem("div", attributes, children);
export const action = (text, command) => elem("span", {"onClick": command}, [text]);

// private functions

const addAttribute = (elem, name, value) => {
    if (name === "class" ) {
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

const convertSchemaToElem = (schema, name, path) => {
    if (!schema) {
        raiseError("No schema of data");
        return;
    }

    // TODO determine correct type with more sophisticated way
    let obj;
    if ("object" === typeof schema) {
        obj = objectCards(schema);
    } else {
        // TODO create another serializes
        obj = "TODO implement this";
    }

    return div({"class": "bde-root"}, [
        pathDiv(path), headerDiv(name), div({"class": "bde-field"}, [obj])
    ]);

};

const pathDiv = (path) => {
    // TODO convert to path elements
    const pathArray = [];
    return div( {"class": "bde-path"}, pathArray);
}

const headerDiv = (name) => div({"class": "bde-header"}, [name]);

const objectCards = (schema) => {
    const schemaChildren = Object.entries(schema).map(([name, value]) => namedCard(name, [value]));
    return [staticCard("{"), ...schemaChildren, staticCard("}")];
};

const staticCard = (text) => card([elem("span", {"class": "bde-big"}, [text])]);

// ---
const getByPath = (obj, path) =>
    path.reduce((acc, key) => acc?.[key], obj);

const setByPath = (obj, path, value) => {
    const last = path[path.length - 1];
    const parent = path.slice(0, -1)
        .reduce((acc, key) => acc[key], obj);

    parent[last] = value;
};