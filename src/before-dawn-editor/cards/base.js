import {div, action, span, render} from "../main.js";

export const card = (children) => div({"class": "bde-item"}, children);

// TODO show a simple text for a while. Use inputs in the future
export const namedCard = (args) => {

    let content;
    switch (args.schema.type) {
        case "struct":
            content = structContent(args);
            break;
        case "staticText":
            content = args.data;
            break;
        case "array":
            content = arrayContent(args);
            break;
        default:
            // TODO render content
            content = JSON.stringify(args.schema);
    }

    return div({"class": "bde-item bde-item-with-header"},
        [div({"class": "bde-item-header"}, [args.name]), content]);
}

export const orderedCard = (index, children) => div({"class": "bde-item bde-item-with-header"},
    [
        div({"class": "bde-item-in-array"}, [
            action("+", () => alert(`TODO add before ${index}`)),
            ...children,
            action("+", () => alert(`TODO add after ${index}`))
        ]),
        action("-", () => alert(`TODO remove ${index}`))
    ]);

const structContent = (args) => {
    const downLink = span( {}, ["{ " + '\u25BE' + " }"]);
    return div({onClick: () => render(args), "class": "bde-drill-down"}, [downLink]);
}

const arrayContent = (args) => {
    const size = args.data.length;
    const downLink = span( {}, ["[ " + size + " " + '\u25BE' + " ]"]);
    return div({onClick: () => render(args), "class": "bde-drill-down"}, [downLink]);
}

