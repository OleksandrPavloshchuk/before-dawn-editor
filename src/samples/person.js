import {fAddress} from "../custom_fields/address.js";
import {fNumber} from "../before-dawn-editor/fields/base/number.js";
import {fText} from "../before-dawn-editor/fields/base/text.js";
import {fDate} from "../before-dawn-editor/fields/base/date.js";
import {fEmail} from "../before-dawn-editor/fields/base/email.js";
import {fArray} from "../before-dawn-editor/fields/base/array.js";
import {fStruct} from "../before-dawn-editor/fields/base/struct.js";

export const personSample = {
    schema: fStruct( [
        fNumber("id"),
        fText("firstName"),
        fText("secondName"),
        fDate("birthday"),
        fAddress("mainAddress"),
        fAddress("secondaryAddress"),
        fArray(fEmail(), "user@name.com", "emails")
    ], "person"),
    data: {
        id: "1",
        firstName: "John",
        secondName: "Dow",
        birthday: "2000-07-12",
        mainAddress: {
            country: "US",
            city: "Atlanta",
            street: "Peach str. 12/14"
        },
        secondaryAddress: {
            country: "UA",
            city: "Kyiv",
            street: "Peach str. 12/14"
        },
        emails: []
    }
};