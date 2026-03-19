import {setByPath} from "../main.js";
import {elem} from "../dom.js";

export const staticSelectField = {
    name: "base/staticSelect",
    type: "leaf",
    renderAsCard: (ctx) => {
        const onChange = (e) => setByPath(ctx, e.target.value);

        const options = ctx.schema.values.map( (val) =>
            elem("option", {
                value: val,
                ... (val===ctx.data ? {selected: "selected"} : {}),
            }, [val])
        );

        return elem("select", {
            name: ctx.name,
            id: ctx.name,
            onChange
        }, [options]);
    }
}