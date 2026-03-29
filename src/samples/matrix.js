import {fArray} from "../before-dawn-editor/fields/base/array.js";
import {fNumber} from "../before-dawn-editor/fields/base/number.js";

export const matrixSample = {
    schema: fArray(fArray(fNumber(), 0), [], "matrix"),
    data: []
};
