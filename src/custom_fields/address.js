import {fText} from "../before-dawn-editor/fields/text.js";
import {fStruct} from "../before-dawn-editor/fields/struct.js";
import {fStaticSelect} from "../before-dawn-editor/fields/staticSelect.js";

export const fAddress = (name = undefined) => fStruct( [
    fStaticSelect(["US", "UK", "DE", "FR", "UA", "PL"], "country"),
    fText("city"),
    fText("street")
], name);