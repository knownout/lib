/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

export type TObject = { [key: string | number | symbol]: any };

/**
 * Utility function to merge sequences of objects by world-wide key and value reckoning.
 *
 * _This function does not affect the original object._
 *
 * @param {TObject[]} objects array of all objects.
 * @param {[string, any]} mergeKey merge by specific key-value pair.
 * @param {number} minMergeLimit minimum objects in sequence to be merged.
 * @return {TObject[]} generated object with merged entities.
 */
function mergeObjects (objects: TObject[], mergeKey: [ string, any ], minMergeLimit: number = 2): TObject[] {
    // Copy objects list to local variable
    let objectsList = [ ...objects ];

    // Sequence indexes container
    const sequencesList: [ number, number ][] = [];
    let sequenceStartIndex = -1;

    objectsList.forEach((object, index) => {
        // Get key value from object if exist
        const keyValue = object.hasOwnProperty(mergeKey[0]) ? object[mergeKey[0]] : null;
        if (!keyValue) return;

        // If key-value pair matches...
        if (keyValue == mergeKey[1]) {
            // ... update sequence start index if not updated yet.
            if (sequenceStartIndex < 0) sequenceStartIndex = index;
        } else {
            // Otherwise, reset sequence start index
            if (sequenceStartIndex >= 0) {
                // Add entry to the sequences list if min limit reached
                const difference = index - sequenceStartIndex;
                if (difference >= minMergeLimit) sequencesList.push([ sequenceStartIndex, index ]);

                sequenceStartIndex = -1;
            }
        }
    });

    // Check if there is still sequence start index (this will happen if there are
    // consecutive elements at the end of the list)
    if (sequenceStartIndex >= 0 && objectsList.length - sequenceStartIndex >= minMergeLimit)
        sequencesList.push([ sequenceStartIndex, objectsList.length ]);

    // Insert merged objects to the original object as array
    sequencesList.forEach((sequence, index) => {
        // Move sequence indexes back about iteration number
        const sequenceData = sequence.map(e => e - index) as [ number, number ];

        const extracted = objectsList.splice(sequenceData[0], sequenceData[1] - sequenceData[0]);

        objectsList = [
            ...objectsList.slice(0, sequenceData[0]),
            extracted,
            ...objectsList.slice(sequenceData[0], objectsList.length)
        ];

        // console.log(sequenceStartIndex);
    });

    return objectsList;
}

export default mergeObjects;
