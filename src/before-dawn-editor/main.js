export const initBeforeDownEditor = (rootElem, schema) => rootElem.appendChild(convertSchemaToElem(schema));

const convertSchemaToElem = (schema) => {

    const result = document.createElement("div");
    result.setAttribute("class", "bde-root");

    result.appendChild(createHeader());

    const field = document.createElement("div");
    field.setAttribute("class", "bde-field");
    result.appendChild(field);

    // TODO determine correct type with more sophisticated way
    if ("object" === typeof schema) {
        addObject(field, schema);
    } else {
        // TODO create another serializes
        console.log("TRACE", "TODO implement this");
    }

    return result;
};

const createHeader = () => {
    const result = document.createElement("div");
    result.setAttribute("class", "bde-header");
    result.appendChild(createAction("Back (TODO implement this)", "alert('todo')"));
    return result;
}

const createAction = (text, command) => {
    const result = document.createElement("span");
    result.innerHTML = text;
    result.setAttribute("onclick", command);
    return result;
}

const createCard = () => {
    const result = document.createElement("div");
    result.setAttribute("class", "bde-item");
    return result;
}

const addObject = (root, schema) => {
    root.appendChild(createObjectBegin());
    // TODO create object
    root.appendChild(createObjectEnd());
}

const createObjectBegin = () => {
    const result = createCard();
    result.appendChild(createBig("{"));
    return result;
}

const createObjectEnd = () => {
    const result = createCard();
    result.appendChild(createBig("}"));
    return result;
}

const createBig = (text) => {
    const result = document.createElement("span");
    result.setAttribute("class", "bde-big");
    result.innerText = text;
    return result;
}

/*
function el(tag, props = {}, children = []) {
    const element = document.createElement(tag);

    Object.entries(props).forEach(([key, value]) => {
        if (key === "class") element.className = value;
        else if (key.startsWith("on")) {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });

    children.forEach(child => {
        element.appendChild(
            typeof child === "string"
                ? document.createTextNode(child)
                : child
        );
    });

    return element;
}
 */
