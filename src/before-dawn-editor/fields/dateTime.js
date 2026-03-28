import {setByPath} from "../main.js";
import {input} from "../dom.js";
import {field} from "./base.js";

const TYPE = "base/dateTime";

export const dateTimeField = {
    name: TYPE,
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

export const fDateTime =  (name = undefined) => field(TYPE, name);