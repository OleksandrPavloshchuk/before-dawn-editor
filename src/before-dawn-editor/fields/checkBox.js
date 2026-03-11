import {elem, setByPath} from "../main.js";

export const checkBoxContent = (ctx) => {
        const onChange = (e) => {
            ctx.data = e.target.checked;
            setByPath(ctx, e.target.checked);
        };
        return elem("input", { type: "checkbox", checked: ctx.data, onChange });
}