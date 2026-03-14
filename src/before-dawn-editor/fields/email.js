import {elem, setByPath} from "../main.js";

export const emailContent = (ctx) => {

    const onInput = (e) => {
        ctx.data = e.target.value;
        setByPath(ctx, e.target.value);
    };

    return elem("input", {
        name: ctx.name,
        id: ctx.name,
        value: ctx.data,
        type: "email",
        autocomplete: "false",
        onInput
    });
}