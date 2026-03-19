import {setByPath} from "../main.js";
import {input} from "../dom.js";

export const passwordField = {
    name: "base/password",
    type: "leaf",
    renderAsCard: (ctx) => {
        const onInput = (e) => setByPath(ctx, e.target.value);

        return input( {
            name: ctx.name,
            id: ctx.name,
            value: ctx.data,
            type: "password",
            autocomplete: "false",
            onInput
        });
    }
}
