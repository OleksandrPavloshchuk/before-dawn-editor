import {elem, div, action, initBeforeDownEditor} from "../main.js";

export const card = (children) => div({"class": "bde-item"}, children);

// TODO show a simple text for a while. Use inputs in the future
export const namedCard = (args) => {

    let content;
    switch (args.schema.type) {
        case "struct":
            content = structContent(args);
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
    // TODO create "card content" for struct

    const start = elem("span", {}, ["{"]);
    const end = elem("span", {}, ["}"]);

    const temp = elem("span", {}, ["TODO: fields on top"]);

    const drillDown = () => initBeforeDownEditor(
        document.getElementById("root"), args);

    const result = div({onClick: drillDown, "class": "bde-drill-down" },
        [start, temp, end])

    return result;
}
