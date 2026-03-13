import {action, div, span, elem, render, actionDanger} from "../main.js";
import {cardTitle} from "./base.js";

export const renderFrameForArrayItem = (ctx, content) => div(
    {"class": "item"},
    [cardTitle(ctx), table(ctx, content)]
);

export const insertItemBefore = (ctx, index) => action(
    "+",
    `Add new item before ${index}`,
    () => insertNewItemAt(ctx, index)
);

export const insertItemAfter = (ctx, index) => action(
    "+",
    `Add new item after ${index}`,
    () => insertNewItemAt(ctx, index + 1)
);

// ---
const insertNewItemAt = (ctx, pos) => insertAt(ctx, structuredClone(ctx.schema.prototype), pos);
const copyPasteItemAt = (ctx, src, pos) => insertAt(ctx, ctx.data[src], pos);

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
        return c.tagName.toLowerCase()==="td" ? c : elem("td", cls, [c]);
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

const COPY = '\u29C9'+'+'; /* copy: U+29C9 */

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