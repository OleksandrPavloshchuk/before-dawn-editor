import {fArray} from "../before-dawn-editor/fields/base/array.js";
import {fNumber} from "../before-dawn-editor/fields/base/number.js";

export const arraySample = {
    schema: fArray(fNumber(), 0, "array"),
    data: []
};
