import {div} from "../main.js";
import {cardTitle} from "./base.js";

export const renderFrameForStructItem = (args, content) => div(
    {"class": "item"},
    [cardTitle(args), div({"class": "content"}, [content])]
);