import {setByPath} from "../main.js";
import {elem} from "../dom.js";

export const passwordContent = (ctx) => {

    const onInput = (e) => {
        ctx.data = e.target.value;
        setByPath(ctx, e.target.value);
    };

    return elem("input", {
        name: ctx.name,
        id: ctx.name,
        value: ctx.data,
        type: "password",
        autocomplete: "false",
        onInput: onInput
    });
}