import {div} from "../main.js";

export const card = (children) => div({"class": "bde-item"}, children);

// TODO show a simple text for a while. Use inputs in the future
export const cardWithHeader = (headerText, children) => div({"class": "bde-item bde-item-with-header"},
    [div({"class": "bde-item-header"}, [headerText]), ...children]);