import {convertContextsToCards, newPath} from "../main.js";
import {div, span} from "../dom.js";
import {ARROW_DOWN, cardTitle, createCardId, drillLinkContent} from "../card.js";

const createChildCtxByIndex = (ctx, index) => {
    const field = ctx.schema.fields[index];
    return {
        onContextChange: ctx.onContextChange,
        parent: ctx,
        schema: field,
        name: field.name,
        path: newPath(ctx),
        data: ctx.data[field.name]
    };
}

const createChildCtxByName = (ctx, name) => {
    const index = ctx.schema.fields.findIndex( (item) => item.name === name);
    if (index < 0) {
        throw new Error(`No field ${name}`);
    }
    return createChildCtxByIndex(ctx, index);
}

const renderAsDesk = (ctx) => {
    const contexts = ctx.schema.fields.map((_, index) => createChildCtxByIndex(ctx, index));
    return convertContextsToCards(contexts, renderFrameForStructItem);
};

export const structField = {
    name: "base/struct",
    type: "drillable",

    renderAsCard: (ctx) =>
        drillLinkContent(ctx, span({"class": "link"}, ["{ " + ARROW_DOWN + " }"])),

    renderAsDesk,

    chainBegin: () => div({"class": "aside left"}, [span({"class": "big"}, ["{"])]),
    chainEnd: () => div({"class": "aside right"}, [span({"class": "big"}, ["}"])]),

    createChildCtxByIndex,
    createChildCtxByName
}

const renderFrameForStructItem = (ctx, content) => div(
    {"class": "item", "id": createCardId(ctx)},
    [cardTitle(ctx), div({"class": "content"}, [content])]
);