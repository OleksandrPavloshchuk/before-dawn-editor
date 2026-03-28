import {setByPath} from "../main.js";
import {input} from "../dom.js";
import {field} from "./base.js";

const TYPE = "base/date";

export const dateField = {
    name: TYPE,
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

export const fDate =  (name = undefined) => field(TYPE, name);