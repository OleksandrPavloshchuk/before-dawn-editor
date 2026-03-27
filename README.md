# before-dawn-editor

A lightweight JavaScript editor for structured data with JSON export.

---

# Overview

**before-dawn-editor** is a lightweight, extensible, and easy-to-use component for editing structured data that conforms to a predefined JSON schema.

Instead of overwhelming users with very large forms (sometimes containing hundreds of fields), the editor allows navigation through a **structured tree of data**. Users focus only on the part of the structure they currently need to edit.

The editor supports:

* Editing hierarchical JSON structures
* Exporting and importing parts of the edited content
* Schema-based validation
* Extensible field controls
* Navigation through nested objects and arrays

The component is implemented using **vanilla JavaScript**.

Future plans include integration with modern frameworks such as:

* React
* Vue
* Angular

---

# Screenshot

*(Add a screenshot or animated GIF here once the UI is stable)*

Example:

```
docs/screenshot.png
```

---

# Installation

Currently the editor can be used by simply including the files in your project.

Example:

```html
<link rel="stylesheet" href="dist/before-dawn-editor/main.css">
<script src="dist/before-dawn-editor/main.js"></script>
```

Then add a container:

```html
<div id="root"></div>
```

---

# Quick Start

Example initialization:

```javascript
document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "person",
    schema: schema,
    data: data,
    root: data,
    publishData: (obj) => {
        console.log("Updated object:", obj);
    }
}));
```

---

# Architecture

The editor is based on a **schema-driven rendering approach**.

Core idea:

```
schema → render → context → path → data update
```

Where:

* **schema** defines the structure of the data
* **render()** builds the UI based on the schema
* **context** describes the currently rendered node
* **path** identifies the location of the node in the structure
* **data update** modifies the root JSON object

Each rendered node receives a **context object** describing its schema, data, and location.

---

# Application API

The component renders an HTML control inside a container element with `id="root"`.

### Example invocation

```javascript
document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "person",
    schema: schema,
    data: data,
    root: data,
    publishData: (obj) => {
        console.log("onUpdate", obj);
    },
    onContextChange: (fieldChain) => {
        console.log("onContextChange", fieldChain);
    }
}));
```

---

## render(context)

Renders the editor or a nested node inside the container.

Rendering is **recursive**, meaning structures and arrays can contain other structures or arrays.

---

# Context Structure

The `context` object contains the following fields:

| Field               | Description                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| **name**            | Name of the structure field or array index                                                           |
| **parent**          | The root data object                                                                                 |
| **data**            | Data of the current node                                                                             |
| **schema**          | Schema definition of the current node                                                                |
| **path**            | Array of contexts from the root to the current node                                                  |
| **publishData**     | Returns the data object to the external caller                                                       |
| **goToPath**        | Moves to a path formatted as `"field1 / field2 / ..."` if it exists                                  |
| **onContextChange** | Callback invoked when the context changes; returns an array of fields passed to an external consumer |

---

# Controls and Operations

The editor provides a set of UI controls for navigating and editing data.

| Control                | Description                                                               |
| ---------------------- | ------------------------------------------------------------------------- |
| navigation item        | Click to navigate to a previous context in the path                       |
| Show object on console | Available only at the root level. Calls `onUpdate()` with the root object |
| ⬇️                     | Navigate to a nested structure                                            |
| (array length) ⬇️      | Navigate to a nested array                                                |
| +                      | Insert a new array item                                                   |
| −                      | Remove the current array item                                             |
| ⬅️                     | Move the current array item left                                          |
| ➡️                     | Move the current array item right                                         |

---

# Schema Structure

The editor uses a schema to define the structure of editable data.

Each schema entry has the form:

```
key : field schema
```

---

## Schema as Code

The schema is defined using JavaScript functions.

Available helpers:

* **fText(name = undefined)** – generates an input with `type="text"`
* **fStaticText(name = undefined)** – generates simple static text
* **fStaticSelect(values, name = undefined)** – generates a select control with option keys as values
* **fPassword(name = undefined)** – generates an input with `type="password"`
* **fNumber(name = undefined)** – generates an input with `type="number"`
* **fEmail(name = undefined)** – generates an input with `type="email"`
* **fDateTime(name = undefined)** – generates an input with `type="datetime-local"`
* **fDate(name = undefined)** – generates an input with `type="date"`
* **fBoolean(name = undefined)** – generates an input with `type="checkbox"`
* **fArray(item, prototype, name = undefined)** – generates an array of controls defined by an item schema and a prototype value
* **fStruct(fields, name = undefined)** – generates a composite field consisting of multiple fields

---

# Schema Examples

```javascript
fStruct([
    fNumber("id"),
    fText("firstName"),
    fText("secondName"),
    fDate("birthday"),
    fAddress("mainAddress"),
    fAddress("secondaryAddress"),
    fArray(fEmail(), "user@name.com", "emails")
], "person")

fArray(fArray(fNumber(), 0), [], "matrix")

export const fAddress = (name = undefined) => fStruct([
    fStaticSelect(["US", "UK", "DE", "FR", "UA", "PL"], "country"),
    fText("city"),
    fText("street")
], name);
```

---

# Data Example for Person

```json
{
    "id": "1",
    "firstName": "John",
    "secondName": "Dow",
    "birthday": "2000-07-12",
    "address": {
        "country": "US",
        "city": "Atlanta",
        "street": "Peach str. 12/14"
    },
    "emails": ["a@b.c"]
}
```

---

# Example Project Structure

```
dist
├── before-dawn-editor
│   ├── card.js
│   ├── dom.js
│   ├── fields
│   │   ├── array.js
│   │   ├── base.js
│   │   ├── checkBox.js
│   │   ├── date.js
│   │   ├── dateTime.js
│   │   ├── email.js
│   │   ├── number.js
│   │   ├── password.js
│   │   ├── staticSelect.js
│   │   ├── staticText.js
│   │   ├── struct.js
│   │   └── text.js
│   ├── fieldsRegistry.js
│   ├── main.css
│   ├── main.js
│   └── title.js
├── custom_fields
│   └── address.js
├── index.html
├── samples
│   ├── array.js
│   ├── matrix.js
│   └── person.js
└── startup.js
```

---

# Roadmap

### Implemented

1. (2026/03/11) Inputs for numbers, dates, timestamps, checkboxes, and dropdowns
2. (2026/03/14) Extended array operations
3. (2026/03/14) "Duplicate current item" for arrays
4. (2026/03/14) Ability to control field order in the UI
5. (2026/03/28) Collapse all, expand all, collapse all except the current node
6. (2026/03/28) Schemas as code; custom fields built on top of basic ones

### Planned features

* Buttons for search by path, export, and import of nodes
* Export of serialized JSON

Basic validation:

* required fields
* non-empty values
* maximum string/array length
* regular expressions
* numeric ranges

Additional features:

* Importing nodes with validation
* Advanced "drill-down" controls:

    * textarea
    * rich text editor
    * geolocation selector
    * URL selector with page preview
    * YouTube video selector with preview
* Dynamic controls that retrieve data from external web services
* Copy JSON path to the node
* Reset to default values
* Plugins for importing content in MD, RTF, DOC, DOCX, XLSX, PPTX formats
* Import of signed content
* Signing of content during publishing

---

# Design Goals

The project aims to provide:

* a **small and lightweight editor**
* **schema-driven UI generation**
* easy extensibility
* compatibility with vanilla JavaScript environments
* future integration with modern frontend frameworks

---

# License

Add your preferred license here.
