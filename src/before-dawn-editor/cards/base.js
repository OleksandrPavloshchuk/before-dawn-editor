import {div, span, render} from "../main.js";
import {textContent} from "../fields/text.js";
import {staticTextContent} from "../fields/staticText.js";
import {numberContent} from "../fields/number.js";
import {dateContent} from "../fields/date.js";
import {dateTimeContent} from "../fields/dateTime.js";
import {passwordContent} from "../fields/password.js";
import {checkBoxContent} from "../fields/checkBox.js";
import {staticSelectContent} from "../fields/staticSelect.js";

export const card = (ctx, renderFrame) => renderFrame(ctx, createContent(ctx));

export const cardTitle = (ctx) => div({"class": "title"}, [ctx.name]);

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