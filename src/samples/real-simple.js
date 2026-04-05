import {fStruct} from "../before-dawn-editor/fields/base/struct.js";
import {fStaticText} from "../before-dawn-editor/fields/base/staticText.js";
import {fText} from "../before-dawn-editor/fields/base/text.js";
import {fArray} from "../before-dawn-editor/fields/base/array.js";
import {fArrayOption} from "../before-dawn-editor/fields/base/arrayOption.js";
import {fNumber} from "../before-dawn-editor/fields/base/number.js";
import {fBoolean} from "../before-dawn-editor/fields/base/checkBox.js";

const fPageListArticle01 = () => fStruct([
    fStaticText("_include"),
    fText("title"),
    fText("backgroundColor"),
    fArray([
        fArrayOption(
            fStruct([
                fStaticText("_include"),
                fNumber("_repeat")
            ]),
            {
                _include: "/page/promo/PagePromo.json",
                _repeat: 3
            }
        )
    ], "items")
], "pageListArticle01");

const fEmailCaptureForm = () => fStruct([
        fStaticText("_include"),
        fText("title"),
        fText("description"),
        fText("buttonLabelText"),
        fBoolean("narrowLayout"),
        fBoolean("setDarkThemeGradient"),
        fArray([
            fArrayOption(
                fStruct([
                    fStaticText("_template"),
                    fText("inputName"),
                    fText("placeholder"),
                    fBoolean("required")
                ]),
                {
                    _template: "/form/input/EmailInput.hbs",
                    inputName: "test-email-field",
                    placeholder: "Enter your email",
                    required: true
                }
            )
        ], "items"),
    ],
    "emailCaptureForm");

export const fPageAsideReal = () => fStruct([
    fStaticText("_include"),
    fArray([
        fArrayOption(
            fEmailCaptureForm(),
            {
                _include: "/form/EmailCaptureForm.json",
                title: "Newsletter",
                description: "Sed scelerisque aenean turpis massa venenatis orci tincidunt enim urna",
                buttonLabelText: "Sign Up",
                narrowLayout: true,
                setDarkThemeGradient: true,
                items: []
            },
            "emailCaptureForm"
        ),
        fArrayOption(
            fPageListArticle01(),
            {
                _include: "/page/list/PageListArticle01.json",
                backgroundColor: "#f8f5ef",
                title: "Related News",
                items: []
            },
            "pageListArticle01"
        )
    ], "aside")
], "pageAsideReal");

// ---
export const pageAsideReal = {
    schema: fPageAsideReal(),
    data: {
        _include: "/article/ArticlePage.json",
        aside: []
    }
};