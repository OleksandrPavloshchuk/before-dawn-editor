import {convertContextsToCards, newPath} from "../main.js";
import {div, span} from "../dom.js";
import {ARROW_DOWN, cardTitle, createCardId, drillLinkContent} from "../cards/base.js";

const renderAsDesk = (ctx) => {
    const contexts = ctx.schema.fields
        .map((field) => {
            return {
                root: ctx.root,
                schema: field,
                name: field.name,
                path: newPath(ctx),
                data: ctx.data[field.name]
            }
        });
    return convertContextsToCards(contexts, renderFrameForStructItem);
};

export const structField = {
    name: "base/struct",
    type: "composite",

    renderAsCard: (ctx) =>
        drillLinkContent(ctx, span({"class": "link"}, ["{ " + ARROW_DOWN + " }"])),

    renderAsDesk,

    chainBegin: () => div({"class": "aside left"}, [span({"class": "big"}, ["{"])]),
    chainEnd: () => div({"class": "aside left"}, [span({"class": "big"}, ["}"])])

}

const renderFrameForStructItem = (ctx, content) => div(
    {"class": "item", "id": createCardId(ctx)},
    [cardTitle(ctx), div({"class": "content"}, [content])]
);