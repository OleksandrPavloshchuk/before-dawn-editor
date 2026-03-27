import {fArray} from "../before-dawn-editor/fields/array.js";
import {fNumber} from "../before-dawn-editor/fields/number.js";

export const matrixSample =
    fArray(fArray(fNumber(), 0), [], "matrix");
