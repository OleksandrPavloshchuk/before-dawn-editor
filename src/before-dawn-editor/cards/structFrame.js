import {div} from "../main.js";
import {cardTitle} from "./base.js";

export const renderFrameForStructItem = (args, content) => div(
    {"class": "bde-item bde-item-with-header"},
    [cardTitle(args), content]
);