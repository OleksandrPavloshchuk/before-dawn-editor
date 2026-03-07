import {action, div, span, elem} from "../main.js";
import {cardTitle} from "./base.js";

export const renderFrameForArrayItem = (args, content) => div(
    {"class": "bde-item bde-item-with-header"},
    [cardTitle(args), table(args, content)]
);

export const insertItemBefore = (index) => action("+", () => alert(`TODO insert before ${index}`));

export const insertItemAfter = (index) => action("+", () => alert(`TODO insert after ${index}`));


// ---
const table = (args, content) => {
    const size = args.size;
    const index = parseInt(args.name);

    return elem("table", {}, [
        elem("tbody", {}, [
            tr([
                insertItemBefore(index),
                content,
                insertItemAfter(index)
            ]),
            tr([
                swapItems(index - 1, index, size),
                removeItem(index),
                swapItems(index, index + 1, size)
            ])
        ])
    ]);
};

const tr = (cells) => elem("tr", {},
    cells.map((c) => elem("td", {}, [c]))
);

const removeItem = (index) => action("-", () => alert(`TODO remove ${index}`));

const swapItems = (index1, index2, size) => {
    if (index1 < 0 || index2 === size) {
        return empty();
    }
    return action("S", () => alert(`TODO swap items ${index1} and ${index2}`));
}

const empty = () => span({}, [""]);