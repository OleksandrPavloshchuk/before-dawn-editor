import {fText} from "../before-dawn-editor/fields/base/text.js";
import {fStruct} from "../before-dawn-editor/fields/base/struct.js";
import {fRestArray} from "../before-dawn-editor/fields/rest/array.js";
import {restOnPublishArrayPreprocessor} from "../before-dawn-editor/preprocessors/restOnPublishArray.js";

export const usersSample = {
    schema: fStruct( [
        fText("title"),
        fRestArray("users")
    ], "users"),
    data: {
        title: "this is title",
        users: {
            $substitute: restOnPublishArrayPreprocessor.discriminator,
            [restOnPublishArrayPreprocessor.endpoint]: "https://dummyjson.com/users",
            [restOnPublishArrayPreprocessor.path]: "users",
            [restOnPublishArrayPreprocessor.limit]: 3
        }
    }
};