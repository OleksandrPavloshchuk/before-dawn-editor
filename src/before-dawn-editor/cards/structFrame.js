import {div} from "../main.js";
import {cardTitle, createCardId} from "./base.js";

export const renderFrameForStructItem = (ctx, content) => div(
    {"class": "item", "id": createCardId(ctx)},
    [cardTitle(ctx), div({"class": "content"}, [content])]
);