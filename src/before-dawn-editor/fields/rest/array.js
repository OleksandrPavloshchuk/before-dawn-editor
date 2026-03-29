import {fStruct} from "../base/struct.js";
import {fText} from "../base/text.js";
import {fNumber} from "../base/number.js";

export const fRestArray = (name = undefined) => fStruct( [
    fText("endpoint"),
    fText("path"),
    fNumber("limit")
], name);