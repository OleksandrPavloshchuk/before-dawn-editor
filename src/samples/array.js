import {fArray} from "../before-dawn-editor/fields/array.js";
import {fNumber} from "../before-dawn-editor/fields/number.js";

export const arraySample = {
    schema: fArray(fNumber(), 0, "array"),
    data: []
};
