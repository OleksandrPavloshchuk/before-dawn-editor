import {div} from "../main.js";
import {cardTitle} from "./base.js";

export const renderFrameForStructItem = (ctx, content) => div(
    {"class": "item"},
    [cardTitle(ctx), div({"class": "content"}, [content])]
);