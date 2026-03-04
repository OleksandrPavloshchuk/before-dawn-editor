export const initBeforeDownEditor = (rootElem, schema) => rootElem.appendChild(convertSchemaToElem(schema));

export const elem = (tag, attributes = {}, children = []) => {
    const result = document.createElement(tag);
    Object.entries(attributes).forEach(([name, value]) => addProperty(result, name, value));
    children.forEach( (child) => appendChild(result, child));
    return result;
};

export const div = ( attributes = {}, children = []) => elem("div", attributes, children);
export const action = (text, command) => elem("span", {"onClick": command}, [text]);
export const card = (children) => div({"class": "bde-item"}, children);

// private functions

const addProperty = (elem, name, value) => {
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

const convertSchemaToElem = (schema) => {

    // TODO determine correct type with more sophisticated way
    let obj;
    if ("object" === typeof schema) {
        obj = objectCards(schema);
    } else {
        // TODO create another serializes
        obj = "TRACE: TODO implement this";
    }

    return div({"class": "bde-root"}, [
        header(), div({"class": "bde-field"}, [obj])
    ]);

};

const header = () => div({"class": "bde-header"}, [
    action("Back (TODO implement this)", () => alert('todo'))
]);

const objectCards = (schema) => {
    // TODO convert to children
    const schemaChildren = [];

    return [staticCard("{"), ...schemaChildren, staticCard("}")];
};

const staticCard = (text) => card([elem("span", {"class": "bde-big"}, [text])]);