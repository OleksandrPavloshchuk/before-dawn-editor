import {cardTitle, createCardId} from "./base.js";
import {div} from "../dom.js";

export const renderFrameForStructItem = (ctx, content) => div(
    {"class": "item", "id": createCardId(ctx)},
    [cardTitle(ctx), div({"class": "content"}, [content])]
);