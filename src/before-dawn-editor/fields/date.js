import {elem, setByPath} from "../main.js";

export const dateContent = (ctx) => {

    const onInput = (e) => {
        ctx.data = e.target.value;
        setByPath(ctx, e.target.value);
    };

    return elem("input", {
        name: ctx.name,
        id: ctx.name,
        value: ctx.data,
        type: "date",
        autocomplete: "false",
        onInput: onInput
    });
}