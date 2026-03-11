import {elem, setByPath} from "../main.js";

export const numberContent = (ctx) => {

    const onInput = (e) => {
        ctx.data = e.target.value;
        setByPath(ctx, e.target.value);
    };

    return elem("input", {
        name: ctx.name,
        id: ctx.name,
        value: ctx.data.toString(),
        type: "number",
        autocomplete: "false",
        onInput: onInput
    });
}