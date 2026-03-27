import {textField} from "./fields/text.js";
import {passwordField} from "./fields/password.js";
import {dateField} from "./fields/date.js";
import {dateTimeField} from "./fields/dateTime.js";
import {staticTextField} from "./fields/staticText.js";
import {numberField} from "./fields/number.js";
import {checkBoxField} from "./fields/checkBox.js";
import {staticSelectField} from "./fields/staticSelect.js";
import {emailField} from "./fields/email.js";
import {structField} from "./fields/struct.js";
import {arrayField} from "./fields/array.js";

const fieldsRegistry = new Map();

// TODO set the list of fields to register:
export const registerFields = () => {
    if (fieldsRegistry.size === 0) {
        registerBaseFields();
        // TODO fill the registry from list:
    }
}

export const getFieldRenderer = (key, mode = "card") => {
    const field = getField(key);
    if (mode === "card") {
        return field.renderAsCard;
    }
    if (mode === "desk") {
        return field.renderAsDesk;
    }
    throw new Error(`Unknown render mode "${mode}"`);
}

export const registerField = (field) => {
    if (!field.name) {
        throw new Error("Field must have a name");
    }
    if (fieldsRegistry.has(field.name)) {
        throw new Error(`Field "${field.name}" already registered`);
    }
    fieldsRegistry.set(field.name, field);
}

export const getField = (key) => {

    const result = fieldsRegistry.get(key);
    if (result) {
        return result;
    }
    // TODO process an error:
    const err = new Error(`no field renderer for key "${key}"`);
    throw err;
}

const registerBaseFields = () => {
    registerField(structField);
    registerField(arrayField);
    registerField(checkBoxField);
    registerField(dateField);
    registerField(dateTimeField);
    registerField(emailField);
    registerField(numberField);
    registerField(passwordField);
    registerField(staticSelectField);
    registerField(staticTextField);
    registerField(textField);
}
