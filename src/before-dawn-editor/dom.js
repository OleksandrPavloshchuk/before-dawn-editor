/**
 * Common method for working with browser's DOM
 */

export const elem = (tag, attributes = {}, children = []) => {
    const result = document.createElement(tag);
    Object.entries(attributes).forEach(([name, value]) => addAttribute(result, name, value));
    children.forEach((child) => appendChild(result, child));
    return result;
};

export const div = (attributes = {}, children = []) => elem("div", attributes, children);

export const span = (attributes = {}, children = []) => elem("span", attributes, children);

export const input = (attributes = {}, children = []) => elem("input", attributes, children);

export const action = (text, title, onClick) => span({
    onClick,
    "class": "link",
    title
}, [text]);

export const actionWithId = (id, text, title, onClick) => span({
    onClick,
    "class": "link",
    title,
    id
}, [text]);

export const actionDanger = (text, title, onClick) => span({
    onClick,
    "class": "link action-danger",
    title
}, [text]);

export const getRoot = () => document.getElementById("root");

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
