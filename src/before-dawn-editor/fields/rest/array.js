import {fStruct} from "../base/struct.js";
import {fText} from "../base/text.js";
import {fNumber} from "../base/number.js";
import {fStaticText} from "../base/staticText.js";
import {restOnPublishArrayPreprocessor} from "../../preprocessors/restOnPublishArray.js";

export const fRestArray = (name = undefined) => fStruct( [
    fStaticText("$substitute"),
    fText(restOnPublishArrayPreprocessor.endpoint),
    fText(restOnPublishArrayPreprocessor.path),
    fNumber(restOnPublishArrayPreprocessor.limit)
], name);