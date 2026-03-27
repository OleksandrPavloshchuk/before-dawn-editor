import {setByPath} from "../main.js";
import {input} from "../dom.js";
import {field} from "./base.js";

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

export const fDate =  (name = undefined) => field("base/date", name);