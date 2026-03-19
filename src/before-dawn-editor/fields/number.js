import {setByPath} from "../main.js";
import {input} from "../dom.js";

export const numberField = {
    name: "base/number",
    type: "leaf",
    renderAsCard: (ctx) => {
        const onInput = (e) => {
            ctx.data = e.target.value;
            setByPath(ctx, e.target.value);
        };

        return input( {
            name: ctx.name,
            id: ctx.name,
            value: ctx.data.toString(),
            type: "number",
            autocomplete: "false",
            onInput
        });
    }
}