# 🧱 Utility functions library

_Выберите язык документации:_ [English](https://github.com/re-knownout/lib/tree/master/package/README.md), **Русский** (
выбран)

Данный проект является утилитарным и служит для предоставления часто используемой функциональности в виде пакета npm.
Ниже приведен список доступных функций и классов с кратким описанием, документацией и примерами использования.

## [Функции](#документация-по-функциям)

|   # | Наименование                                | Описание                                                                                                 |
|----:|:--------------------------------------------|:---------------------------------------------------------------------------------------------------------|
|   1 | [classNames](#classnames)                   | Создает класс элемента из данных любого типа (в том числе массивы и объекты)                             |
|   2 | [mergeObjects](#mergeobjects)               | Объединяет объекты, расположенные последовательно, в группы                                              |
|   3 | [mergeStringArray](#mergestringarray)       | Объединяет элементы массива строк, расположенные последовательно, в группы (надстройка над mergeObjects) |
|   4 | [limitNumber](#limitnumber)                 | Ограничивает заданное число по верхней и/или нижней границе                                              |
|   5 | [computeArrayWeights](#computearrayweights) | Рассчитывает т.н. вес каждого элемента массива строк на базе определенного запроса (строки)              |
|   6 | [sortByWeights](#sortbyweights)             | Сортирует элементы массива строк на базе их весов (надстройка над computeArrayWeights)                   |
|   7 | [computeProgress](#computeprogress)         | Вычисляет прогресс в процентах (от 0 до 100) на базе текущего значения, верхней и нижней границы         |
|   8 | [compareStrings](#comparestrings)           | Сравнивает двух строк при помощи специальных преобразований                                              |
|   9 | [cleanString](#cleanstring)                 | Очищает строку и применяет к ней регулярные выражения (если заданы)                                      |
|  10 | [rotateArray](#rotatearray)                 | Вращает массив в заданном направлении на определенное число шагов                                        |

## [Классы](#документация-по-классам)

|   # | Наименование                                     | Описание                                                                       |
|----:|:-------------------------------------------------|:-------------------------------------------------------------------------------|
|   1 | [DateConverter](#dateconverter)                  | Конвертирует заданную дату в unix timestamp или в human-readable формат        |
|   2 | [StringExtractor](#stringextractor)              | Извлекает определенные (заданные пользователем) включения из строки            |
|   3 | [StringProcessor](#stringprocessor)              | Модифицирует строку при помощи определенный методов и фильтров                 |
|   4 | [StorageController](#storagecontroller)          | Контроллер для хранилища браузера (надстройка над нативным Storage)            |
|   5 | [MakeFormData](#makeformdata)                    | Упрощает создание объектов типа FormData и их взаимодействие с fetch-запросами |
|   6 | [Random](#random)                                | Генераторы случайны данных различных типов                                     |
|   7 | [MakeElement (устарел)](#makeelement-deprecated) | Конструктор HTML элементов                                                     |

# Документация по функциям

### classNames

- Сигнатура: `(...args: any[]) => string`.

Функция для генерации класса элемента на базе данных различного типа. Каждый массив, переданный в эту функцию будет
сглажен, объекты — конвертированы по следующей схеме: `{[className]: Boolean}`. К каждому элементу будет применен
метод `.trim()`

```ts
classNames("hello", { world: true, "not": null }) // => "hello world"
```

<br>

### mergeObjects

- Сигнатура: `(objects: TObject[], mergeKey: [ string, any ], minMergeLimit: number = 2) => TObject[]`

Сложная функция для объединения объектов с идентичными т.н. ключами, расположенных последовательно, в группы по
следующей схеме (для `A`): `{ A, A, B, A, A, B, B } => { [A, A], B, [A, A], B B }`. Свойство `minMergeLimit` определяет
минимальное число элементов в последовательности для того, чтобы она была объединена в группу.

```ts
mergeObjects([ { key: "A", text: "Hello" }, { key: "A", text: "World" }, { key: "B", text: "Not" } ], { key: "A" })
```

```json5
// Результат выполнения
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

### mergeStringArray

- Сигнатура: `(array: string[], minMergeLimit: number = 2) => string[]`

Работает, как и функция mergeObjects, но для массивов строк.

<br>

### limitNumber

- Сигнатура: `(value: number, top?: number | null, bottom?: number | null) => number`

Ограничивает заданное число по верхней и/или нижней границе. Значение `null` для границы полностью убирает ее и
позволяет установить следующую.

```ts
limitNumber(10, 5, 0) // => 5

limitNumber(15, null, 10) // => 15

limitNumber(-10, 5, 0) // => 0
```

<br>

### computeArrayWeights

- Сигнатура: `(query: string, array: string[]) => number[]`

Рассчитывает т.н. вес каждого элемента массива строк на базе определенного запроса. Чем меньше вес, тем лучше.

```ts
computeArrayWeights("Hello", [ "henlo", "hellow", "okay", "goodbye" ])
```

```json5
// Результат выполнения
[
    0.0375234521575985,
    0,
    1.0793465577596266,
    0.6635071090047393
]
```

<br>

### sortByWeights

- Сигнатура: `(query: string, array: string[]) => string[]`

Сортирует массив строк на базе весов каждого элемента, полученных из предыдущей функции. Элементы, которые больше всего
похожи на запрос, будут расположены выше.

```ts
sortByWeights("Hello", [ "ok", "good", "henlow", "henlo" ]) // => ["henlow", "henlo", "good", "ok"] 
```

<br>

### computeProgress

- Сигнатура: `(value: number, max = 100, min = 0) => number`

Рассчитывает прогресс в процентах (от 0 до 100) на основе текущего значения, верхней и нижней границы. Расчет ведется на
базе следующей формулы: `X = (A * 100) / (B - C)`.

```ts
computeProgress(10, 200, 100) // => 10
computeProgress(10, 200) // => 5
```

<br>

### compareStrings

- Сигнатура: `(a: string, b: string) => { result: boolean, weight: number }`

Сравнивает две строки при помощи специфических трансформаций, и предоставляет данные в виде веса операции и результата
сравнения (boolean).

_Чем ниже вес, тем лучше._

```ts
compareStrings("Hello", "henlo") // => { "result": true, "weight": 0.0375234521575985 }

compareStrings("Hello", "nothello") // => { "result": false, "weight": 0.707635009310987 }

compareStrings("Hello", "hello") // => { "result": true, "weight": 0 }
```

<br>

### cleanString

- Сигнатура: `(entry: string, cleanRegexp?: RegExp) => string`

Очищает строку и применяет к ней регулярные выражения (если заданы). Автоматически удаляет лишние пробелы и отступы,
даже если регулярные выражения (фильтры) не заданы.

```ts
cleanString("Hello   world ") // => "Hello world"
```

<br>

### rotateArray

- Сигнатура: `<T = unknown[]>(array: T, right = true, steps = 1) => T`

Вращает массив в заданном направлении на определенное число шагов.

```ts
rotateArray([ 1, 2, 3, 4, 5 ]) // => [5, 1, 2, 3, 4]

rotateArray([ 1, 2, 3, 4, 5 ], true, 3) // => [3, 4, 5, 1, 2] 

rotateArray([ 1, 2, 3, 4, 5 ], false) // => [2, 3, 4, 5, 1]
```

<br>

# Документация по классам

## DateConverter

- Сигнатура конструктора: `(entry: Date | string | number, unix = true)`

Утилита для конвертации даты, заданной в формате объекта Date, unix/js временного штампа или строки.

### Список методов

1. `toUnuxTimestamp() => number` - конвертировать дату в unix timestamp
2. `toReadable (mappings: TMonthMappings = russianMonths, format: string = this.defaultReadableFormat) => string` -
   конвертировать дату в понятную для человека (human-readable) при помощи специальных преобразований.

### Объект схемы преобразований

```json5
{
    casing: {
        "обычноеОкончание": "падежноеОкончание"
    },
    months: [
        "названиеПервогоМесяца",
        "названиеВторогоМесяца",
        "..."
    ]
}
```

### Использование

```ts
// Date.now() / 1000 - unix timestamp
const converter = new DateConverter(Date.now() / 1000)

converter.toReadable() // => 10 мая 2022

converter.toUnixTimestamp // => 1652187277
```

## StringExtractor

- Сигнатура конструктора: `(public entry: string)`

Утилита для извлечения определенных (заданных пользователем) включений из строки.

### Список методов

1. `get extract (): { entry: string; extracted: { [p: string]: string[]; }; }` - извлекает определенные включения из
   строки при помощи заданных пользователем экстракторов.
2. `attach (...extractors: (RegExp | [ RegExp, string ])[]): this` - добавляет новый экстрактор в виде регулярного
   выражения к текущему экземпляру.

### Использование

```ts
const extractor = new StringExtractor("Hello !weird #world")

extractor.attach(/#[A-z]*/g, [ /![A-z]*/, "excl" ])

extractor.extract // => { entry: 'Hello', extracted: { '#': [ 'world' ], excl: [ '!weird' ] } }

// Получить доступ к извлеченным данным можно при помщи совйтсва .extracted
extractor.extracted // => вернет тот же результат, что и метод .extract после выполнения

// Также было обновлено свойство extractor.entry, теперь, вместо всей строки, оно содержит только 'Hello'
```

## StringProcessor

- Сигнатура конструктора: `(public entry: string)`

Утилита для модификации строк при помощи определенных методов и фильтров.

### Список методов

1. `get extractor () => StringExtractor` - получить доступ к экземпляру класса StringExtractor.
2. `get wordsList () => string[]` - создать массив слов из текущей строки.
3. `get removeDuplicates () => this` - Удалить повторяющиеся слова из текущей строки при помощи
   функции `mergeStringArray`.

_После выполнения метод `removeDuplicate` вернет экземпляр класса, а результат будет записан напрямую в строку._

4. `compare (value: string) => { result: boolean, weight: number }` - сравнить текущую строку с другой при помощи
   функции `compareStrings`.
5. `get clean () => this` - очистить текущую строку при помощи функции `cleanString`.
6. `limitWordsCount (limit: number, ellipsis: boolean = true, numbers = true) => this` - ограничить количество слов в
   текущей строке _(действует по тому же принципу, что и `removeDuplicates`, записывая результат выполнения напрямую)_.
7. `filter (...filters: (RegExp | string)[]) => this` - применяет определённые регулярные выражения к текущей строке.

### Использование

```ts
const processor = new StringProcessor("Hey, hello hello weird world!");

// Не будет работать с разницей в регистре (верхни/нижни) и со знаками пунктуации
processor.removeDuplicates;

processor.entry // => 'Hey, hello weird world!'

processor.wordsList // => [ 'Hey,', 'hello', 'weird', 'world!' ]

// Из-за того, что данный метод перезаписывает свойство .entry, отрезанные 
// слова невозможно будет восстановить
processor.limitWordsCount(3)

processor.entry // => Hey, hello weird...
```

## StorageController

- Сигнатура конструктора: `(public readonly storage: Storage)`

Надстройка над нативным Storage для предоставления упрощенного интерфейса взаимодействия и хранения данных в формате
JSON _(работает медленнее из-за JSON-преобразований)_.

### Список методов

1. `getItem<T = any> (key: string) => false | T` - получить содержимое определенного браузерного хранилища и
   преобразовать данные в объект.
2. `setItem<T = any> (key: string, value: T) => this` - преобразовать значение в строку и записать его в определенное
   браузерное хранилище.
3. `removeItem (key: string) => this` - удалить значение из определенного браузерного хранилища.
4. `exist (key: string) => boolean` - проверить, существует ли значение в определенном ранилище.

### Использование

```ts
const controller = new StorageController(localStorage);

// Методы могут идти цепочкой
controller.setItem("keyName", { key: "World" });

controller.getItem("keyName").key // => `World`
```

## MakeFormData

- Сигнатура конструктора: `(items?: { [key: string]: any })`

Утилита для упрощения создания объектов типа FormData и их взаимодействия с fetch-запросами.

### Список методов

1. `fetchObject () => { method: string, body: FormData }` - получить объект типа FetchData в виде, пригодном для
   использования в fetch-запросе.
2. `add (items: { [key: string]: any }, forceJson: boolean = false) => this` - надстройка над нативным методу для
   добавления данных в объект типа FormData. Позволяет одновременно добавлять несколько значений
   _(forceJson используется для принудительного преобразования нефайловых записей в объекты JSON)_.
3. `remove (...items: string[]) => this` - надстройка над нативным методом удаления данных из объекта типа FormData,
   позволяет удалить несколько значений одновременно.

_Доступ к объекту типа FormData можно получить с помощью свойства `.entry` экземпляра класса MakeFormData._

### Использование

```ts
const formData = new MakeFormData();

formData.add({ key: "Hello world" });

formData.entry // => FormData

formData.fetchObject // => { method: "POST", body: FormData }
```

## Random

- Сигнатура конструктора: `does not have a constructor`

Утилита для генерации случайных значений различных типов.

### Список методов

1. `static string (length: number, pattern: string = "AZ,az,09") => string` - генератор случайных строк фиксированной
   длины.

_Метод `string` получает диапазон значений из паттерна при помощи преобразования символов в их коды. Из-за этого паттерн
будет работать так, как вы думаете, только если в нем использованы символы, которые идут
последовательно: `AZ, az, 09, ...`._

2. `static arrayElement<T = unknown> (array: T[]) => T` - выбор случайного элемента массива.
3. `static number (min: number, max: number) => number` - генератор случайного числа с верхней и нижней границей.
4. `uniqueValues<T = any> (count: number, generator: Function) => Set<T>` - генератор случайных уникальных значений для
   каждого экземпляра класса.

_Метод `uniqueValues` сохраняет сгенерированные значения внутри переменной экземпляра (ОЗУ). Если вы создаете другой
экземпляр, сгенерированные значения могут повторяться._

Метод `uniqueValues` выдаст ошибку после 10 000 попыток генерации, она означает, что все возможные значения уже
сгенерированы.

_Методы экземпляра класса (обертка вокруг статических):_

5. `string (length: number, pattern: string = "AZ,az,09") => string`
6. `arrayElement<T = unknown> (array: T[]) => T `
7. `number (min: number, max: number) => number`

### Подробнее о паттернах

Паттерн должен передаваться как строка, содержащая значения
(не длиннее двух символов), разделенные запятой. Каждое значение будет преобразовано в массив символов
(если длина = 2) или просто передается в сгенерированный массив (если длина = 1).

Примеры преобразования паттерна:

```text
AD → [A, B, C, D]

AC,ac → [A, B, C, a, b, c]

02,AB,@,# → [0, 1, 2, A, B, @, #]
```

### Использование статических методов

```ts
Random.string(10, "AZ,09") // => 'RLDL0QQLWV'

Random.arrayElement([ 1, 2, 3, 4, 5 ]) // => 4

Random.number(100, 212) // => 107

Random.number(100.3, 212.5) // => 153.52220396806507
```

### Использование методов экземпляра

```ts
const random = new Random();

random.uniqueValues(5, () => Random.string(3))
// => Set(5) { 'YRd', 'GI3', 'ig2', 'D8o', 'Ro0' }

// Другие методы экземпляра являются просто обертками
// статических методов.

```

## MakeElement (deprecated)

- Сигнатура конструктора: `<K extends keyof HTMLElementTagNameMap> (tag: K)`

Утилита для простого создания элементов HTML и управления ими.

_**@deprecated** (документацию все еще можно найти в исходном коде или внутри `bin/classes/MakeElement.d.ts`)_

re-knownout - https://github.com/re-knownout/
<br>knownout@hotmail.com
