import {setByPath} from "../main.js";
import {input} from "../dom.js";

export const dateTimeField = {
    name: "base/dateTime",
    type: "leaf",
    renderAsCard: (ctx) => {
        const onInput = (e) => setByPath(ctx, e.target.value);

        return input( {
            name: ctx.name,
            id: ctx.name,
            value: ctx.data,
            type: "datetime-local",
            autocomplete: "false",
            onInput
        });
    }
}