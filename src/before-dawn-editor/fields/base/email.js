import {setByPath} from "../../main.js";
import {input} from "../../dom.js";
import {field} from "./base.js";

const TYPE = "base/email";

export const emailField = {
    name: TYPE,
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

export const fEmail =  (name = undefined) => field(TYPE, name);