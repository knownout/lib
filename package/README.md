# 🧱 Utility functions library

This is a service project for providing common functionality as a npm package. Below is a list of available features
with a short description.

## [Functions](#functions-usage)

|   # | Name                                                 | Description                                                              |
|----:|:-----------------------------------------------------|:-------------------------------------------------------------------------|
|   1 | [classNames](#classnames-function)                   | Create class names from any type of objects                              |
|   2 | [mergeObjects](#mergeobjects-function)               | Combine objects that go sequentially into groups                         |
|   3 | [mergeStringArray](#mergestringarray-function)       | Combine array entries that go sequentially (add-on over mergeObjects)    |
|   4 | [limitNumber](#limitnumber-function)                 | Limit a certain number to an upper and lower bound                       |
|   5 | [computeArrayWeights](#computearrayweights-function) | Calculate weight of strings array items based on another string (query)  |
|   6 | [sortByWeights](#sortbyweights-function)             | Sort strings array by computed weights                                   |
|   7 | [computeProgress](#computeprogress-function)         | Calculate progress (0-100) based on provided current, min and max values |
|   8 | [compareStrings](#comparestrings-function)           | Compare two strings with specific filters                                |
|   9 | [cleanString](#cleanstring-function)                 | Clean string with or without regular expression                          |
|  10 | [rotateArray](#rotatearray-function)                 | Rotate an array to specified direction by one or more steps              |

## [Classes](#classes-usage)

|   # | Name                                                      | Description                                            |
|----:|:----------------------------------------------------------|:-------------------------------------------------------|
|   1 | [DateConverter](#dateconverter-class)                     | Convert date from unix or from date to selected format |
|   2 | [StringExtractor](#stringextractor-class)                 | Extract special entries from string                    |
|   3 | [StringProcessor](#stringprocessor-class)                 | Modify strings with special properties                 |
|   4 | [StorageController](#storagecontroller-class)             | Browser storage data controller                        |
|   5 | [MakeFormData](#makeformdata-class)                       | Simplifying the creation of FormData objects           |
|   6 | [Random](#random-class)                                   | Several random value generators                        |
|   7 | [MakeElement (deprecated)](#makeelement-class-deprecated) | Plain html elements constructor                        |

# Functions usage

### classNames function

- Signature: `(...args: any[]) => string`.

A function to generate class names from objects of any type. All array type arguments will be flattened, objects will be
converted as `{[className]: Boolean}`. Each entry will be automatically truncated.

```ts
classNames("hello", { world: true, "not": null }) // => "hello world"
```

<br>

### mergeObjects function

- Signature: `(objects: TObject[], mergeKey: [ string, any ], minMergeLimit: number = 2) => TObject[]`

Complicated function for merging objects with identical key by this scheme (for `A`):
`{ A, A, B, A, A, B, B } => { [A, A], B, [A, A], B B }`. The `minMergeLimit` property determines how many elements with
the selected key must be sequentially placed in one place for merging.

```ts
mergeObjects([ { key: "A", text: "Hello" }, { key: "A", text: "World" }, { key: "B", text: "Not" } ], { key: "A" })
```

```json5
// Execution result
[
   [
      {
         "key": "A",
         "text": "Hello"
      },
      {
         "key": "A",
         "text": "World"
      }
   ],
   {
      "key": "B",
      "text": "Not"
   }
]
```

<br>

### mergeStringArray function

- Signature: `(array: string[], minMergeLimit: number = 2) => string[]`

Works the same as mergeObjects, but for string arrays.

<br>

### limitNumber function

- Signature: `(value: number, top?: number | null, bottom?: number | null) => number`

Limit a certain number to an upper and lower bound, pass null to remove specific bound and use next one.

```ts
limitNumber(10, 5, 0) // => 5sortByWeights("Hello", ["ok", "good", "henlow", "henlo"])

limitNumber(15, null, 10) // => 15

limitNumber(-10, 5, 0) // => 0
```

<br>

### computeArrayWeights function

- Signature: `(query: string, array: string[]) => number[]`

Calculates weight of the elements of a strings array based on a specific query. The less weight is better.

```ts
computeArrayWeights("Hello", [ "henlo", "hellow", "okay", "goodbye" ])
```

```json5
// Execution result
[
   0.0375234521575985,
   0,
   1.0793465577596266,
   0.6635071090047393
]
```

<br>

### sortByWeights function

- Signature: `(query: string, array: string[]) => string[]`

Sorting the array of strings by the computed weights from the previous function. The entries most like the query will be
higher.

```ts
sortByWeights("Hello", [ "ok", "good", "henlow", "henlo" ]) // => ["henlow", "henlo", "good", "ok"] 
```

<br>

### computeProgress function

- Signature: `(value: number, max = 100, min = 0) => number`

Calculate progress (0-100) based on provided current, min and max values. Calculates using this
formula: `X = (A * 100) / (B - C)`.

```ts
computeProgress(10, 200, 100) // => 10
computeProgress(10, 200) // => 5
```

<br>

### compareStrings function

- Signature: `(a: string, b: string) => { result: boolean, weight: number }`

Compare two strings with specific filters and returns comparison result (boolean)
and comparison weight (number, lower is better).

```ts
compareStrings("Hello", "henlo") // => { "result": true, "weight": 0.0375234521575985 }

compareStrings("Hello", "nothello") // => { "result": false, "weight": 0.707635009310987 }

compareStrings("Hello", "hello") // => { "result": true, "weight": 0 }
```

<br>

### cleanString function

- Signature: `(entry: string, cleanRegexp?: RegExp) => string`

Cleaning a string with or without a regular expression. Automatically trim input and remove extra spaces.

```ts
cleanString("Hello   world ") // => "Hello world"
```

<br>

### rotateArray function

- Signature: `<T = unknown[]>(array: T, right = true, steps = 1) => T`

Rotate an array to specified direction by one or more steps.

```ts
rotateArray([ 1, 2, 3, 4, 5 ]) // => [5, 1, 2, 3, 4]

rotateArray([ 1, 2, 3, 4, 5 ], true, 3) // => [3, 4, 5, 1, 2] 

rotateArray([ 1, 2, 3, 4, 5 ], false) // => [2, 3, 4, 5, 1]
```

<br>

# Classes usage

## DateConverter class

- Constructor signature: `(entry: Date | string | number, unix = true)`

Utility class to convert date, javascript or unix timestamps to specific forms.

### Methods list

1. `toUnuxTimestamp() => number` - convert date to unix timestamp.
2. `toReadable (mappings: TMonthMappings = russianMonths, format: string = this.defaultReadableFormat) => string` -
   convert date to human-readable format using name mappings and format property.

### Mappings scheme

```json5
{
   casing: {
      "regularEnding": "caseEnding"
   },
   months: [
      "firstMonthName",
      "secondMonthName",
      "..."
   ]
}
```

### Usage

```ts
// Date.now() / 1000 is a unix timestamp
const converter = new DateConverter(Date.now() / 1000)

converter.toReadable() // => 10 мая 2022

converter.toUnixTimestamp // => 1652187277
```

# StringExtractor class

- Constructor signature: `(public entry: string)`

Utility class for retrieving specific entries defined as regular expressions from the provided string.

### Methods list

1. `get extract (): { entry: string; extracted: { [p: string]: string[]; }; }` - extract specific entities from string
   using defined extractors.
2. `attach (...extractors: (RegExp | [ RegExp, string ])[]): this` - attach regular expression extractor to current
   instance.

### Usage

```ts
const extractor = new StringExtractor("Hello !weird #world")

extractor.attach(/#[A-z]*/g, [ /![A-z]*/, "excl" ])

extractor.extract // => { entry: 'Hello', extracted: { '#': [ 'world' ], excl: [ '!weird' ] } }

// Extracted values can be accessed using extracted property
extractor.extracted // => same to extractor.extract method execution result

// Also updated property extractor.entry, now it is equal to 'Hello'
```

# StringProcessor class

- Constructor signature: `(public entry: string)`

Utility class for modifying strings with special properties.

### Methods list

1. `get extractor () => StringExtractor` - get StringExtractor class instance.
2. `get wordsList () => string[]` - generate words array from current entry.
3. `get removeDuplicates () => this` - Remove duplicate words from entry using `mergeStringArray` utility function.

_`removeDuplicate` method return StringProcessor class instance, removing result writing directly into entry._

4. `compare (value: string) => { result: boolean, weight: number }` - Compare current entry with specific string
   using `compareStrings` function.
5. `get clean () => this` - clean entry string using cleanString function.
6. `limitWordsCount (limit: number, ellipsis: boolean = true, numbers = true) => this` - limit words count in current
   entry _(act like `removeDuplicates`, writes result directly into entry)_.
7. `filter (...filters: (RegExp | string)[]) => this` - apply regular expressions or strings as filters
   (like word filter) to the current entry.

### Usage

```ts
const processor = new StringProcessor("Hey, hello hello weird world!");

// will not work with upper/lower case and punctuation
processor.removeDuplicates;

processor.entry // => 'Hey, hello weird world!'

processor.wordsList // => [ 'Hey,', 'hello', 'weird', 'world!' ]

// Cuz' this method write directly into entry, you cannot restore deleted words
processor.limitWordsCount(3)

processor.entry // => Hey, hello weird...
```

# StorageController class

- Constructor signature: `(public readonly storage: Storage)`

An add-on over the native browser storage. Provides simplified interaction interface
(slower than native due to JSON transformations).

### Methods list

1. `getItem<T = any> (key: string) => false | T` - get item from defined browser storage by a specific key and parse
   item data like JSON content.
2. `setItem<T = any> (key: string, value: T) => this` - stringify provided value and write it to the defined browser
   storage.
3. `removeItem (key: string) => this` - remove item from defined browser storage.
4. `exist (key: string) => boolean` - check if specific key exists in the defined storage.

### Usage

```ts
const controller = new StorageController(localStorage);

// Methods can be chained
controller.setItem("keyName", { key: "World" });

controller.getItem("keyName").key // => `World`
```

# MakeFormData class

- Constructor signature: `(items?: { [key: string]: any })`

Utility class for creating FormData objects that can be chained.

### Methods list

1. `fetchObject () => { method: string, body: FormData }` - get native FormData object as object suitable for the fetch
   function.
2. `add (items: { [key: string]: any }, forceJson: boolean = false) => this` - an add-on over the native method for
   adding a FormData object, allows simultaneous application of several elements
   _(forceJson used to force non-file entries conversion as JSON objects)_.
3. `remove (...items: string[]) => this` - an add-on over the native remove method of the FormData object allows
   deleting multiple items at the same time.

_FormData can be accessed with `.entry` property of MakeFormData instance._

### Usage

```ts
const formData = new MakeFormData();

formData.add({ key: "Hello world" });

formData.entry // => FormData

formData.fetchObject // => { method: "POST", body: FormData }
```

# Random class

- Constructor signature: `does not have a constructor`

Utility class for generating various types of random values.

// TODO: add Random class documentation

# MakeElement class (deprecated)

- Constructor signature: `<K extends keyof HTMLElementTagNameMap> (tag: K)`

Utility class for easily creating and manipulating HTML elements.

_**@deprecated** (documentation can still be found in the sources or inside `bin/classes/MakeElement.d.ts`)_

re-knownout - https://github.com/re-knownout/
<br>knownout@hotmail.com
