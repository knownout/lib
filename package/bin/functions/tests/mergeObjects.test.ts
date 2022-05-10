/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import mergeObjects from "../mergeObjects";

const testObjects = [
    [
        { type: "cat", id: 1 },
        { type: "cat", id: 2 },
        { type: "dog", id: 3 },
        { type: "cat", id: 4 },
        { type: "cat", id: 5 },
        { type: "dog", id: 3 },
        { type: "cat", id: 4 },
        { type: "cat", id: 5 }
    ],
    [
        { type: "cat", id: 1 },
        { type: "dog", id: 2 },
        { type: "cat", id: 3 },
        { type: "dog", id: 4 },
        { type: "cat", id: 5 }
    ],
    [
        { type: "cat", id: 1 },
        { type: "cat", id: 2 },
        { type: "cat", id: 3 },
        { type: "cat", id: 4 },
        { type: "cat", id: 5 }
    ]
];

const testObjectTransform = [
    [
        [
            { type: "cat", id: 1 },
            { type: "cat", id: 2 }
        ],
        { type: "dog", id: 3 },
        [
            { type: "cat", id: 4 },
            { type: "cat", id: 5 }
        ],
        { type: "dog", id: 3 },
        [
            { type: "cat", id: 4 },
            { type: "cat", id: 5 }
        ]
    ],
    [
        { type: "cat", id: 1 },
        { type: "dog", id: 2 },
        { type: "cat", id: 3 },
        { type: "dog", id: 4 },
        { type: "cat", id: 5 }
    ],
    [
        [
            { type: "cat", id: 1 },
            { type: "cat", id: 2 },
            { type: "cat", id: 3 },
            { type: "cat", id: 4 },
            { type: "cat", id: 5 }
        ]
    ]
];

describe("mergeObject function test", () => {
    it("Mixed object triple merging test", () =>
        expect(mergeObjects(testObjects[0], { type: "cat" })).toEqual(testObjectTransform[0])
    );

    it("Mixed object without merging test", () =>
        expect(mergeObjects(testObjects[1], { type: "cat" })).toEqual(testObjectTransform[1])
    );

    it("Object with identical elements test", () =>
        expect(mergeObjects(testObjects[2], { type: "cat" })).toEqual(testObjectTransform[2])
    );
});
