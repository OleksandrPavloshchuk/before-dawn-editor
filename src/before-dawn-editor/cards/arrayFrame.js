import {action, div, span, elem} from "../main.js";
import {cardTitle} from "./base.js";

export const renderFrameForArrayItem = (args, content) => div(
    {"class": "item"},
    [cardTitle(args), table(args, content)]
);

export const insertItemBefore = (index) => action("+", () => alert(`TODO insert before ${index}`));

export const insertItemAfter = (index) => action("+", () => alert(`TODO insert after ${index}`));


// ---
const table = (args, content) => {
    const size = args.size;
    const index = parseInt(args.name);

    const LEFT = "\u21D0";
    const RIGHT = '\u21D2';

    return elem("table", {}, [
        elem("tbody", {}, [
            tr([
                insertItemBefore(index),
                content,
                insertItemAfter(index)
            ]),
            tr([
                swapItems(LEFT, index - 1, index, size),
                removeItem(index),
                swapItems(RIGHT, index, index + 1, size)
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
            case cells.length-1:
                cls = {"class": "right"};
                break;
        }
        return elem("td", cls, [c]);
    })
);

const removeItem = (index) => action("-", () => alert(`TODO remove ${index}`));

const swapItems = (text, index1, index2, size) => {
    if (index1 < 0 || index2 === size) {
        return empty();
    }
    return action(text, () => alert(`TODO swap items ${index1} and ${index2}`));
}

const empty = () => span({}, [""]);