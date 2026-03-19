import {setByPath} from "../main.js";
import {input} from "../dom.js";

export const dateField = {
    name: "base/date",
    type: "leaf",
    renderAsCard: (ctx) => {
        const onInput = (e) => setByPath(ctx, e.target.value);

        return input( {
            name: ctx.name,
            id: ctx.name,
            value: ctx.data,
            type: "date",
            autocomplete: "false",
            onInput
        });
    }
}