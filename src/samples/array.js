import {fArray} from "../before-dawn-editor/fields/base/array.js";
import {fNumber} from "../before-dawn-editor/fields/base/number.js";
import {fArrayOption} from "../before-dawn-editor/fields/base/arrayOption.js";
import {fText} from "../before-dawn-editor/fields/base/text.js";

export const arraySample = {
    schema: fArray([
        fArrayOption(fNumber(), 0, "number"),
        fArrayOption(fText(), "Hello World!", "text"),
    ], "array"),
    data: []
};
