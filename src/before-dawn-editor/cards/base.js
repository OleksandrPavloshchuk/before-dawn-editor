import {div, span, render, action, actionWithId} from "../main.js";
import {textContent} from "../fields/text.js";
import {staticTextContent} from "../fields/staticText.js";
import {numberContent} from "../fields/number.js";
import {dateContent} from "../fields/date.js";
import {dateTimeContent} from "../fields/dateTime.js";
import {passwordContent} from "../fields/password.js";
import {checkBoxContent} from "../fields/checkBox.js";
import {staticSelectContent} from "../fields/staticSelect.js";
import {emailContent} from "../fields/email.js";

export const card = (ctx, renderFrame) => renderFrame(ctx, createContent(ctx));

export const cardTitle = (ctx) => div({"class": "title"}, [
    div({},[ctx.name, expandOneFieldAction(ctx), expandAllFieldsAction(ctx)])
]);

export const createCardId = (ctx) => `cardField_${ctx.name}`;

//---

const createContent = (ctx) =>  {
    switch (ctx.schema.type) {
        case "struct": return structContent(ctx);
        case "array": return arrayContent(ctx);
        case "text": return textContent(ctx);
        case "password": return passwordContent(ctx);
        case "date": return dateContent(ctx);
        case "dateTime": return dateTimeContent(ctx);
        case "staticText": return staticTextContent(ctx);
        case "number": return numberContent(ctx);
        case "boolean": return checkBoxContent(ctx);
        case "staticList": return staticSelectContent(ctx);
        case "email": return emailContent(ctx);
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

const drillLinkContent = (ctx, link) => div({onClick: () => render(ctx)}, [link]);

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