import {div, span, render, elem, setByPath} from "../main.js";

export const cardWithTitle = (args, renderFrame) => renderFrame(args, createContent(args));

export const cardTitle = (args) => div({"class": "title"}, [args.name]);

//---

// TODO show a simple text for a while. Use inputs in the future
const createContent = (args) =>  {
    switch (args.schema.type) {
        case "struct": return structContent(args);
        case "text": return textContent(args);
        case "array": return arrayContent(args);
        default:
            // TODO render content
            return JSON.stringify(args.schema);
    }
};

const ARROW_DOWN = '\u25BE';

const structContent = (args) => {
    const downLink = span({"class": "link"}, ["{ " + ARROW_DOWN + " }"]);
    return div({onClick: () => render(args)}, [downLink]);
}

const arrayContent = (args) => {
    const size = args.data.length;
    const downLink = span({ "class": "link"}, ["[ " + size + " " + ARROW_DOWN + " ]"]);
    return div({onClick: () => render(args)}, [downLink]);
}

const textContent = (args) => {

    const onInput = (e) => {
        args.data = e.target.value;
        const namesChain = args.path.slice(1).map((ctx) => ctx.name).concat(args.name);
        setByPath(args.root, namesChain, e.target.value);
    };

    return elem("input", {
        name: args.name,
        id: args.name,
        value: args.data,
        type: "text",
        autocomplete: "false",
        onInput: onInput
    });
}

