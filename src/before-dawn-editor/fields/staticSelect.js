import {setByPath} from "../main.js";
import {elem} from "../dom.js";

export const staticSelectContent = (ctx) => {

    const onChange = (e) => {
        ctx.data = e.target.value;
        setByPath(ctx, e.target.value);
    };

    const options = ctx.schema.values.map( (val) =>
        elem("option", {
            value: val,
            ... (val===ctx.data ? {selected: "selected"} : {}),
        }, [val])
    );

    return elem("select", {
        name: ctx.name,
        id: ctx.name,
        onChange: onChange
    }, [options]);
}