# before-dawn-editor

A lightweight JavaScript editor for structured data with JSON export.

------------------------------------------------------------------------

## Overview

**before-dawn-editor** is a lightweight, extensible, and easy‑to‑use
component for editing structured data that conforms to a predefined JSON
schema.

Instead of overwhelming users with very large forms (sometimes hundreds
of fields), the editor allows navigation through a **structured tree of
data**. Users focus only on the part of the structure they currently
need to edit.

The editor supports:

- Editing hierarchical JSON structures
- Exporting and importing parts of the edited content
- Schema‑based validation
- Extensible field controls
- Navigation through nested objects and arrays

The component is implemented using **vanilla JavaScript**.

Future plans include integration with modern frameworks such as:

- React
- Vue
- Angular

------------------------------------------------------------------------

# Screenshot

*(Add a screenshot or animated GIF here once the UI is stable)*

Example:

    docs/screenshot.png

------------------------------------------------------------------------

# Installation

Currently the editor can be used by simply including the files in your
project.

Example:

``` html
<link rel="stylesheet" href="dist/before-dawn-editor/main.css">
<script src="dist/before-dawn-editor/main.js"></script>
```

Then add a container:

``` html
<div id="root"></div>
```

------------------------------------------------------------------------

# Quick Start

Example initialization:

``` javascript
document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "person",
    schema: schema,
    data: data,
    root: data,
    onUpdate: (obj) => {
        console.log("Updated object:", obj);
    }
}));
```

------------------------------------------------------------------------

# Architecture

The editor is based on a schema‑driven rendering approach.

Core idea:

    schema → render → context → path → data update

Where:

- **schema** defines the structure of the data
- **render()** builds the UI based on the schema
- **context** describes the currently rendered node
- **path** identifies the location of the node in the structure
- **data update** modifies the root JSON object

Each rendered node receives a **context object** describing its schema,
data, and location.

------------------------------------------------------------------------

# Application API

The component renders an HTML control inside a container element with
`id="root"`.

### Example invocation

``` javascript
document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "person",
    schema: schema,
    data: data,
    root: data,
    onUpdate: (obj) => {
        console.log("onUpdate", obj);
    }
}));
```

------------------------------------------------------------------------

## render(context)

Renders the editor or a nested node inside the container.

Rendering is **recursive**, meaning structures and arrays can contain
other structures or arrays.

------------------------------------------------------------------------

# Context Structure

The `context` object contains the following fields:

  -----------------------------------------------------------------------
Field Description
  ---------------------- ------------------------------------------------
**name**               Name of the structure field or array index

**root**               The root data object

**data**               Data of the current node

**schema**             Schema definition of the current node

**path**               Array of contexts from the root to the current
node

**onUpdate**           Callback invoked when the root object should be
passed to an external consumer
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Controls and Operations

The editor provides a set of UI controls for navigating and editing
data.

  -----------------------------------------------------------------------
Control Description
  ------------------------ ----------------------------------------------
navigation item Click to navigate to a previous context in the
path

Show object on console Available only at the root level. Calls
`onUpdate()` with the root object

* ⬇️ Navigate to a nested structure
* (array length) ⬇️ Navigate to a nested array
* \+ Insert a new array item
* \- Remove the current array item
* ⬅️ Move the current array item left
* ➡️ Move the current array item right

-----------------------------------------------------------------------

------------------------------------------------------------------------

# Schema Structure

The editor uses a schema to define the structure of editable data.

Each schema entry has the form:

    key : field schema

## Schema properties

Property Description
  ------------ ---------------------------------------------------------

* **name**     Name of field (only for `struct`)
* **type**     Field type (`struct`, `array`, `text`, `staticText`, `number`, `boolean`, `date`, `dateTime`, `password`,
  `staticList` )
* **fields**   Nested array of fields (only for `struct`)
* **item**     Schema definition for array elements (only for `array`)
* **values**   Options as text constants (only for `staticList`)

------------------------------------------------------------------------

# Schema Example

``` json
{
    "name": "person",
    "type": "struct",
    "fields": [
        { "name": "id", "type": "number" },
        { "name": "firstName", "type": "text" },
        { "name": "secondName", "type": "text" },
        { "name": "birthday", "type": "date" },
        {
            "name": "address",
            "type": "struct",
            "fields": [
                {
                    "name": "country",
                    "type": "staticList",
                    "values": ["US", "UK", "GE", "FR", "UA", "PL"]
                },
                { "name": "city", "type": "text" },
                { "name": "street", "type": "text" }
            ]
        },
        {
            "name": "emails",
            "type": "array",
            "item": {
                "type": "email"
            },
            "prototype": "user@name.com"
        }
    ]
}
```

------------------------------------------------------------------------

# Data Example

``` json
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
    emails: [ "a@b.c" ]
}
```

------------------------------------------------------------------------

# Example Project Structure

```
dist
├── before-dawn-editor
│   ├── cards
│   │   ├── arrayFrame.js
│   │   ├── base.js
│   │   └── structFrame.js
│   ├── fields
│   │   ├── checkBox.js
│   │   ├── date.js
│   │   ├── dateTime.js
│   │   ├── email.js
│   │   ├── number.js
│   │   ├── password.js
│   │   ├── staticSelect.js
│   │   ├── staticText.js
│   │   └── text.js
│   ├── main.css
│   └── main.js
├── index.html
├── samples
│   ├── array.js
│   ├── matrix.js
│   └── person.js
└── startup.js
```

------------------------------------------------------------------------

# Roadmap

Implemented:

1. (2026/03/11) Inputs for numbers, dates, timestamps, checkboxes, and dropdowns
2. (2026/03/14) Extended array operations
3. (2026/03/14) "Duplicate current item" for array
4. (2026/03/14) Set the order of field on the UI.

Planned features:

* Export of serialized JSON
* Basic validation:
    - required fields
    - non‑empty values
    - maximum string/array length
    - regular expressions
    - numeric ranges
* Importing nodes with validation
* Advanced "drill‑down" controls:
    - textarea
    - rich text editor
    - geolocation selector
    - URL selector with page preview
    - YouTube video selector with preview
* Dynamic controls that retrieve data from external web services
* (TODO set it on the beginning) Copy JSON path to the node
* (TODO set it on the beginning) Collapse all, expand all, collapse all excepting current.
* (TODO set it on the beginning) Reset to default values.
* Plugins for importing content in MD, RTF, DOC, DOCX, XLSX, PPTS formats.
* Import of signed content.
* Signing of content during publishing.

------------------------------------------------------------------------

# Design Goals

The project aims to provide:

- a **small and lightweight editor**
- **schema‑driven UI generation**
- easy extensibility
- compatibility with vanilla JavaScript environments
- future integration with modern frontend frameworks

------------------------------------------------------------------------

# License

Add your preferred license here.