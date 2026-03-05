import {div, action} from "../main.js";

export const card = (children) => div({"class": "bde-item"}, children);

// TODO show a simple text for a while. Use inputs in the future
export const namedCard = (headerText, children) => div({"class": "bde-item bde-item-with-header"},
    [div({"class": "bde-item-header"}, [headerText]), ...children]);

export const orderedCard = (index, children) => div({"class": "bde-item bde-item-with-header"},
    [
        div({"class": "bde-item-in-array"}, [
            action("+", () => alert(`TODO add before ${index}`)),
            ...children,
            action("+", () => alert(`TODO add after ${index}`))
        ]),
        action("-", () => alert(`TODO remove ${index}`))
    ]);
