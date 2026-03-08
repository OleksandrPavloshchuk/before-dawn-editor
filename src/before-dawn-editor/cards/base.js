import {div, span, render, elem, setByPath} from "../main.js";

export const card = (ctx, renderFrame) => renderFrame(ctx, createContent(ctx));

export const cardTitle = (ctx) => div({"class": "title"}, [ctx.name]);

//---

// TODO show a simple text for a while. Use inputs in the future
const createContent = (ctx) =>  {
    switch (ctx.schema.type) {
        case "struct": return structContent(ctx);
        case "text": return textContent(ctx);
        case "array": return arrayContent(ctx);
        default:
            // TODO render content
            return JSON.stringify(ctx.schema);
    }
};

const ARROW_DOWN = '\u25BE';

const structContent = (ctx) =>
    drillLinkContent(ctx, span({"class": "link"}, ["{ " + ARROW_DOWN + " }"]));

const arrayContent = (ctx) =>
    drillLinkContent(ctx, span({ "class": "link"}, ["[ " + ctx.data.length + " " + ARROW_DOWN + " ]"]));

const textContent = (ctx) => {

    const onInput = (e) => {
        ctx.data = e.target.value;
        setByPath(ctx, e.target.value);
    };

    return elem("input", {
        name: ctx.name,
        id: ctx.name,
        value: ctx.data,
        type: "text",
        autocomplete: "false",
        onInput: onInput
    });
}

const drillLinkContent = (ctx, link) => div({onClick: () => render(ctx)}, [link]);