import {setByPath} from "../main.js";
import {input} from "../dom.js";
import {field} from "./base.js";

export const emailField = {
    name: "base/email",
    type: "leaf",
    renderAsCard: (ctx) => {
        const onInput = (e) => setByPath(ctx, e.target.value);

        return input( {
            name: ctx.name,
            id: ctx.name,
            value: ctx.data,
            type: "email",
            autocomplete: "false",
            onInput
        });
    }
}

export const fEmail =  (name = undefined) => field("base/email", name);