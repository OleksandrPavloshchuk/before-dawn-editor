import {card, namedCard} from "./cards/base.js";

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

    let obj;
    switch (args.schema.type) {
        case "struct":
            obj = structCards(args);
            break;
        case "array":
            obj = arrayCards(args);
            break;
        default:
            obj = "TODO implement this";
    }

    return div({"class": "bde-root"}, [
        pathDiv(args.path), headerDiv(args.name), div({"class": "bde-field"}, [obj])
    ]);

};

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
        .map(([name, schema]) => {
            const data = args.data[name];
            return namedCard({schema, name, path, data})
        });
    return [staticCard("{"), ...schemaChildren, staticCard("}")];
};

const arrayCards = (args) => {
    const path = [...args.path, args];
    const schema = args.schema.item;
    const arrayChildren = args.data.map((data, index) => {
        return namedCard({schema, name: `${index}`, path, data})
    });
    return [staticCard("["), ...arrayChildren, staticCard("]")];
};

const staticCard = (text) => card([elem("span", {"class": "bde-big"}, [text])]);

const getRoot = () => document.getElementById("root");
