import {setByPath} from "../main.js";
import {input} from "../dom.js";
import {field} from "./base.js";

const TYPE = "base/boolean";

export const checkBoxField = {
    name: TYPE,
    type: "leaf",
    renderAsCard: (ctx) => {
        const onChange = (e) => setByPath(ctx, e.target.checked);
        return input({ type: "checkbox", checked: ctx.data, onChange });
    }
}

export const fBoolean =  (name = undefined) => field(TYPE, name);