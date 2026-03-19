import {convertContextsToCards, newPath, setByPath} from "../main.js";
import {span} from "../dom.js";
import {ARROW_DOWN, drillLinkContent} from "../cards/base.js";
import {renderFrameForStructItem} from "../cards/structFrame.js";

export const structField = {
    name: "base/struct",
    type: "composite",

    renderAsCard: (ctx) =>
        drillLinkContent(ctx, span({"class": "link"}, ["{ " + ARROW_DOWN + " }"])),

    renderAsDesk: (ctx) => structCards(ctx)

}

const structCards = (ctx) => {
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
