import {fArray} from "../before-dawn-editor/fields/base/array.js";
import {fNumber} from "../before-dawn-editor/fields/base/number.js";
import {fArrayOption} from "../before-dawn-editor/fields/base/arrayOption.js";

export const arraySample = {
    schema: fArray([
        fArrayOption(fNumber(), () => 0)
    ], "array"),
    data: []
};
