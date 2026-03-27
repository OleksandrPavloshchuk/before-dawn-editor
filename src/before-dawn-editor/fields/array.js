import {convertContextsToCards, newPath, render} from "../main.js";
import {action, actionDanger, div, elem, span} from "../dom.js";
import {ARROW_DOWN, cardTitle, createCardId, drillLinkContent} from "../card.js";
import {field} from "./base.js";

const TYPE = "base/array";

const renderAsDesk = (ctx) => {
    if (!ctx || !ctx.data) {
        throw new Error("Object does not exist.");
    }
    const contexts = ctx.data.map((_, index) => createChildCtxByIndex(ctx, index));
    return convertContextsToCards(contexts, renderFrameForArrayItem);
};

const createChildCtxByIndex = (ctx, index) => {
    const data = ctx.data[index];
    return {
        onContextChange: ctx.onContextChange,
        parent: ctx,
        schema: ctx.schema.item,
        name: `${index}`,
        path: newPath(ctx),
        data,
        size: ctx.data.length
    };
}

const createChildCtxByName = (ctx, name) => createChildCtxByIndex(ctx, Number.parseInt(name));

export const arrayField = {
    name: TYPE,
    type: "drillable",

    renderAsCard: (ctx) =>
        drillLinkContent(ctx, span({"class": "link"}, ["[ " + ctx.data.length + " " + ARROW_DOWN + " ]"])),

    renderAsDesk,

    chainBegin: (ctx) => div({"class": "aside right"}, [
        span({"class": "big"}, ["["]),
        insertItemBefore(ctx, 0)
    ]),

    chainEnd: (ctx) => div({"class": "aside left"}, [
        insertItemAfter(ctx, ctx.data.length - 1),
        span({"class": "big"}, ["]"])]
    ),

    createChildCtxByIndex,
    createChildCtxByName

}

export const fArray =  (item, prototype, name = undefined) =>
    field(TYPE, name, {item, prototype});

const renderFrameForArrayItem = (ctx, content) => div(
    {"class": "item", "id": createCardId(ctx)},
    [cardTitle(ctx), table(ctx, content)]
);

const insertItemBefore = (ctx, index) => action(
    "+",
    `Add new item before ${index}`,
    () => insertNewItemAt(ctx, index)
);

const insertItemAfter = (ctx, index) => action(
    "+",
    `Add new item after ${index}`,
    () => insertNewItemAt(ctx, index + 1)
);
const insertNewItemAt = (ctx, pos) => insertAt(ctx, structuredClone(ctx.schema.prototype), pos);
const copyPasteItemAt = (ctx, src, pos) => {
    const deepCopy = structuredClone(ctx.data[src]);
    insertAt(ctx, deepCopy, pos);
};

const insertAt = (ctx, item, pos) => {
    ctx.data.splice(pos, 0, item);
    // TODO do not redraw all control
    render(ctx);
}


const table = (ctx, content) => {
    const size = ctx.size;
    const index = parseInt(ctx.name);

    const LEFT = "\u21D0";
    const RIGHT = '\u21D2';

    const parentCtx = ctx.path[ctx.path.length - 1];

    return elem("table", {}, [
        elem("tbody", {}, [
            tr([
                insertItemBefore(parentCtx, index),
                td(content, 2),
                insertItemAfter(parentCtx, index)
            ]),
            tr([
                copyPasteItemBefore(parentCtx, index),
                copyPasteItemAfter(parentCtx, index)
            ]),
            tr([
                swapItems(parentCtx, LEFT, index - 1, index, size),
                removeItem(parentCtx, index),
                swapItems(parentCtx, RIGHT, index, index + 1, size)
            ])
        ])
    ]);
};

const tr = (cells) => elem("tr", {},
    cells.map((c, i) => {
        let cls = {};
        switch (i) {
            case 0:
                cls = {"class": "left"};
                break;
            case cells.length - 1:
                cls = {"class": "right"};
                break;
        }
        return c.tagName.toLowerCase() === "td" ? c : elem("td", cls, [c]);
    })
);

const td = (content, height) => {
    const attr = height ? {rowspan: height.toString()} : {};
    return elem("td", attr, [content]);
}

const removeItem = (ctx, pos) => actionDanger(
    "X",
    `Remove item ${pos}`,
    () => {
        ctx.data.splice(pos, 1);
        // TODO do not redraw all control
        render(ctx);
    });

const swapItems = (ctx, text, index1, index2, size) => {
    if (index1 < 0 || index2 === size) {
        return empty();
    }
    return action(
        text,
        `Swap items ${index1} and ${index2}`,
        () => {
            const temp = ctx.data[index1];
            ctx.data[index1] = ctx.data[index2];
            ctx.data[index2] = temp;
            // TODO do not redraw all control
            render(ctx);
        });
}

const COPY = '\u29C9' + '+'; /* copy: U+29C9 */

const copyPasteItemBefore = (ctx, index) => action(
    COPY,
    `Copy this item before ${index}`,
    () => copyPasteItemAt(ctx, index, index)
);

const copyPasteItemAfter = (ctx, index) => action(
    COPY,
    `Copy this item after ${index}`,
    () => copyPasteItemAt(ctx, index, index + 1)
);

const empty = () => span();