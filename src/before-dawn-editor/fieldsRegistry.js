import {textContent} from "./fields/text.js";
import {passwordContent} from "./fields/password.js";
import {dateContent} from "./fields/date.js";
import {dateTimeContent} from "./fields/dateTime.js";
import {staticTextContent} from "./fields/staticText.js";
import {numberContent} from "./fields/number.js";
import {checkBoxContent} from "./fields/checkBox.js";
import {staticSelectContent} from "./fields/staticSelect.js";
import {emailContent} from "./fields/email.js";

const fieldsRegistry = new Map();

// TODO set the list of fields to register:
export const registerFields = () => {
    if (fieldsRegistry.size === 0) {
        registerBaseFields();
        // TODO fill the registry from list:
    }
}

export const getFieldRenderer = (key) => {

    const result = fieldsRegistry.get(key);
    if (result) {
        return result;
    }
    // TODO process an error:
    const err = new Error(`no field renderer for key "${key}"`);
    throw err;
}

const registerBaseFields = () => {
    fieldsRegistry.set("base/text", textContent);
    fieldsRegistry.set("base/password", passwordContent);
    fieldsRegistry.set("base/date", dateContent);
    fieldsRegistry.set("base/dateTime", dateTimeContent);
    fieldsRegistry.set("base/staticText", staticTextContent);
    fieldsRegistry.set("base/number", numberContent);
    fieldsRegistry.set("base/boolean", checkBoxContent);
    fieldsRegistry.set("base/staticList", staticSelectContent);
    fieldsRegistry.set("base/email", emailContent);
}
