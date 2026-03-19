import {setByPath} from "../main.js";
import {input} from "../dom.js";

export const checkBoxField = {
    name: "base/boolean",
    type: "leaf",
    renderAsCard: (ctx) => {
        const onChange = (e) => {
            ctx.data = e.target.checked;
            setByPath(ctx, e.target.checked);
        };
        return input({ type: "checkbox", checked: ctx.data, onChange });
    }
}