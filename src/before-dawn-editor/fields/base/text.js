import {setByPath} from "../../main.js";
import {input} from "../../dom.js";
import {field} from "./base.js";

const TYPE = "base/text";

export const textField = {
    name: TYPE,
    type: "leaf",
    renderAsCard: (ctx) => {
        const onInput = (e) => setByPath(ctx, e.target.value);

        return input( {
            name: ctx.name,
            id: ctx.name,
            value: ctx.data,
            type: "text",
            autocomplete: "false",
            onInput
        });
    }
}

export const fText =  (name = undefined) => field(TYPE, name);