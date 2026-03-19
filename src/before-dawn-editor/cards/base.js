import {render} from "../main.js";
import {actionWithId, div, span} from "../dom.js";
import {getFieldRenderer} from "../fieldsRegistry.js";

export const card = (ctx, renderFrame) => renderFrame(ctx, createContent(ctx));

export const cardTitle = (ctx) => div({"class": "title"}, [
    div({},[ctx.name, expandOneFieldAction(ctx), expandAllFieldsAction(ctx)])
]);

export const createCardId = (ctx) => `cardField_${ctx.name}`;

export const ARROW_DOWN = '\u25BE';

export const drillLinkContent = (ctx, link) => div({onClick: () => render(ctx)}, [link]);

//---

const createContent = (ctx) =>  {
    let renderer;
    switch (ctx.schema.type) {
        case "base/array":
            renderer = arrayContent;
            break;
        default:
            renderer = getFieldRenderer(ctx.schema.type);
    }
    return renderer(ctx);
};

const arrayContent = (ctx) =>
    drillLinkContent(ctx, span({ "class": "link"}, ["[ " + ctx.data.length + " " + ARROW_DOWN + " ]"]));

const EXPAND_ONE = '\u2922';
const expandOneFieldAction = (ctx) => actionWithId(expandOneActionId(ctx), EXPAND_ONE, "Expand this field",
    () => expandOneField(ctx)
);

const EXPAND_ALL = '\u2921';
const expandAllFieldsAction = (ctx) => {
    const result = actionWithId(expandAllActionId(ctx), EXPAND_ALL, "Expand all fields",
        () => expandAllFields(ctx)
    );
    result.setAttribute("style", "display: none");
    return result;
};

const expandOneField = (ctx) => {
    const expandAllActionElem = document.getElementById(expandAllActionId(ctx));
    const expandOneActionElem = document.getElementById(expandOneActionId(ctx));
    expandAllActionElem.style.display = 'block';
    expandOneActionElem.style.display = 'none';

    expandOne(ctx);
};

const expandAllFields = (ctx) => {
    const expandAllActionElem = document.getElementById(expandAllActionId(ctx));
    const expandOneActionElem = document.getElementById(expandOneActionId(ctx));
    expandAllActionElem.style.display = 'none';
    expandOneActionElem.style.display = 'block';

    expandAll();
};

const expandOneActionId = (ctx) => `expand-one-${ctx.name}`;
const expandAllActionId = (ctx) => `expand-all-${ctx.name}`;

const expandOne = (ctx) => {
    const root = getControlAreaElem();
    const cardId = createCardId(ctx);
    root.querySelectorAll('.item').forEach(node => {
        if (node.getAttribute("id")!==cardId) {
            node.style.display = 'none';
        }
    });
};

const expandAll = () => {
    const root = getControlAreaElem();
    root.querySelectorAll('.item').forEach(node => {
        node.style.display = 'block';
    });
};

const getControlAreaElem = () => document.getElementById("control-area");