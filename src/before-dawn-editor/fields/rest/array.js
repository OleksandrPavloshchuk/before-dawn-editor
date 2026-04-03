import {fStruct} from "../base/struct.js";
import {fText} from "../base/text.js";
import {fNumber} from "../base/number.js";
import {fStaticText} from "../base/staticText.js";

export const fRestArray = (name = undefined) => fStruct( [
    fStaticText("_substitute"),
    fText("_endpoint"),
    fText("_path"),
    fNumber("_limit")
], name);