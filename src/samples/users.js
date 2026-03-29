import {fText} from "../before-dawn-editor/fields/base/text.js";
import {fStruct} from "../before-dawn-editor/fields/base/struct.js";
import {fRestArray} from "../before-dawn-editor/fields/rest/array.js";

export const usersSample = {
    schema: fStruct( [
        fText("title"),
        fRestArray("users")
    ], "users"),
    data: {
        title: "this is title",
        users: {
            type: "restSource",
            endpoint: "https://dummyjson.com/users",
            path: "users",
            limit: 3
        }
    }
};