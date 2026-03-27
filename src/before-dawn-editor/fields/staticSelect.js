import {setByPath} from "../main.js";
import {elem} from "../dom.js";
import {field} from "./base.js";

const TYPE = "base/staticSelect";

export const staticSelectField = {
    name: TYPE,
    type: "leaf",
    renderAsCard: (ctx) => {
        const onChange = (e) => setByPath(ctx, e.target.value);

        const options = ctx.schema.values.map((val) =>
            elem("option", {
                value: val,
                ...(val === ctx.data ? {selected: "selected"} : {}),
            }, [val])
        );

        return elem("select", {
            name: ctx.name,
            id: ctx.name,
            onChange
        }, [options]);
    }
}

export const fStaticSelect = (values, name = undefined) =>
    field(TYPE, name, {values});