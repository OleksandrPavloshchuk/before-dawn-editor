import {setByPath} from "../../main.js";
import {input} from "../../dom.js";
import {field} from "./base.js";

export const numberField = {
    name: "base/number",
    type: "leaf",
    renderAsCard: (ctx) => {
        const onInput = (e) => setByPath(ctx, Number(e.target.value));

        return input({
            name: ctx.name,
            id: ctx.name,
            value: ctx.data.toString(),
            type: "number",
            autocomplete: "false",
            onInput
        });
    }
}

export const fNumber =  (name = undefined) => field("base/number", name);