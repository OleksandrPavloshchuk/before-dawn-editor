# before-dawn-editor
JavaScript editor for structured data with JSON export

## Purpose
This is a lightweight, extensible, easy to use component with editor of JSON content, which satisfies predefined schema of structure.
It should support easy export and import of any parts of the edited content and validation of it. 
It is developed using "vanilla" JavaScript and developer has plans to integrate this control to the most popular 
frontend framework like React, Vue or Angular.

## Application API:
This component creates an HTML control and insert it's into parent component with id="root".
Component invocation sample:
```js
document.addEventListener('DOMContentLoaded', () => render({
    path: [],
    name: "person",
    schema: schema,
    data: data,
    root: data,
    onUpdate: (obj) => { console.log("onUpdate", obj);}
}));
```
**render(context)* - render component, or it's node inside the container

### Context structure
* **name** - name of the structure or substructure or index in array  
* **root** - data of the whole structure
* **data** - data of the selected node of structure
* **schema** - data schema of the selected node 
* **path** - sequence of the contexts from the root
* **onUpdate** - method, which accepts the whole object and passes it to external consumer

### Controls and operations

* **navigation item** - click on it to go to some previous context in the chain
* **Show object on console** - shown only on root level. This action executes `onUpdate()` method with root object.
* **{⬇️}** - move to the nested substructure
* **[(array length)⬇️]** - move to the nested array
* **+** - insert new array item in the specified place
* **-** - remove this item from array
* **⬅️** - swap this array item with the previous one
* **➡️** - swap this array item with the next one

### Schema structure
**key** : field schema

* **type** (struct|array|text) - type of schema
* **fields** (only for type="struct") - nested schema for structure
* **item** (only for type="array") - schema of the every array item 

### Schema sample
```json
{
  type: "struct",
  fields: {
    id: {type: "text"},
    name: {type: "text"},
    birthday: {type: "text"},
    address: {
      type: "struct",
      fields: {
        country: {type: "text"},
        city: {type: "text"},
        street: {type: "text"},
        tags: {
          type: "array",
          item: {type: "text"}
        },
        field1: {
          type: "struct",
          fields: {
            comment: {type: "text"}
          }
        },
        field2: {
          type: "array",
          item: {
            type: "struct",
            fields: {
              dir: {type: "text"}
            }
          }
        }
      }
    }
  }
}
```

### Data sample for schema above
```json
{
  id: "1",
  name: "John Dow",
  birthday: "30.07.2000",
  address: {
    country: "UA",
    city: "Kyiv",
    street: "Metrologichna",
    tags: [
      "the 1st", "the 2nd", "the 3rd"
    ],
    field1: {
      comment: "This is comment"
    },
    field2: [
      {
        dir: "dir-1"
      }
    ]
  }
}
```

### The roadmap

1. Inputs for numbers, dates, timestamps, checkboxes, dropdowns
2. Array operations
3. Creation of the structure from the scratch
4. Export of serialized JSON
5. The simplest validation (required, not empty, maximum string and array length, regular expressions, number ranges)
6. Delivering of possible validation errors to the container
7. Import of the nodes using validation
8. Complex "drill" controls (text area, rich text area, geolocation selector, URL selector with page preview, Yourtube video URL selector with preview)
9. Dynamic controls, which retrieves data from external web services.



