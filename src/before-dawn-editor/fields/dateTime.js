import {setByPath} from "../main.js";
import {input} from "../dom.js";
import {field} from "./base.js";

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

export const fDateTime =  (name = undefined) => field("base/dateTime", name);