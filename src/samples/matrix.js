import {fArray} from "../before-dawn-editor/fields/base/array.js";
import {fNumber} from "../before-dawn-editor/fields/base/number.js";
import {fArrayOption} from "../before-dawn-editor/fields/base/arrayOption.js";

export const matrixSample = {
    schema: fArray([
        fArrayOption(
            fArray([
                fArrayOption(fNumber(), 0)
            ]),
            []
        )],
        "matrix"),
    data: []
};
