import {field} from "./base.js";

const TYPE = "base/staticText";

export const staticTextField = {
    name: TYPE,
    type: "leaf",
    renderAsCard: (ctx) => ctx.data
}

export const fStaticText =  (name = undefined) => field(TYPE, name);