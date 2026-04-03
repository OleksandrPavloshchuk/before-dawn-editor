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
            _substitute: "restOnPublish",
            _endpoint: "https://dummyjson.com/users",
            _path: "users",
            _limit: 3
        }
    }
};