import {field} from "./base.js";

export const staticTextField = {
    name: "base/staticText",
    type: "leaf",
    renderAsCard: (ctx) => ctx.data
}

export const fStaticText =  (name = undefined) => field("base/staticText", name);