import {card, namedCard} from "./cards/base.js";

export const initBeforeDownEditor = (rootElem, args) => {
    rootElem.replaceChildren();
    rootElem.appendChild(convertSchemaToControl(args));
}

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

const convertSchemaToControl = (args) => {
    if (!args || !args.schema) {
        raiseError("No schema of data");
        return;
    }

    let obj;
    switch( args.schema.type ) {
        case "struct":
            obj = structCards(args);
            break;
        default:
            obj = "TODO implement this";
    }

    return div({"class": "bde-root"}, [
        pathDiv(args.path), headerDiv(args.name), div({"class": "bde-field"}, [obj])
    ]);

};

const pathDiv = (path) => {
    const breadscumbs = path.map( (args) => {
        const drillDown = () => initBeforeDownEditor(
            document.getElementById("root"), args);

        const result = elem("span",
            {"onClick": drillDown, "class": "bde-breadscrumb"},
            [args.name]);

        return result;
    });

    return div( {"class": "bde-path"}, breadscumbs);
}

const headerDiv = (name) => div({"class": "bde-header"}, [name]);

const structCards = (args) => {
    const path = [...args.path, args];
    const schemaChildren = Object.entries(args.schema.properties)
        .map(([name, schema]) => namedCard({schema, name, path}));
    return [staticCard("{"), ...schemaChildren, staticCard("}")];
};

const staticCard = (text) => card([elem("span", {"class": "bde-big"}, [text])]);

// ---
const getByPath = (obj, path) =>
    path.reduce((acc, key) => acc?.[key], obj);

const setByPath = (obj, path, value) => {
    const last = path[path.length - 1];
    const parent = path.slice(0, -1)
        .reduce((acc, key) => acc?.[key], obj);

    parent[last] = value;
};