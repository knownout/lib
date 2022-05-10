/*
 * Copyright (c) 2022 Alexandr <re-knownout> knownout@hotmail.com
 * Licensed under the GNU Affero General Public License v3.0 License (AGPL-3.0)
 * https://github.com/re-knownout/lib
 */

import StorageController from "./bin/classes/StorageController";
import DateConverter from "./bin/classes/DateConverter";
import MakeElement from "./bin/classes/MakeElement";
import MakeFormData from "./bin/classes/MakeFormData";
import Random from "./bin/classes/Random";
import StringExtractor from "./bin/classes/StringExtractor";
import StringProcessor from "./bin/classes/StringProcessor";

import classNames from "./bin/functions/classNames";
import limitNumber from "./bin/functions/limitNumber";
import mergeObjects from "./bin/functions/mergeObjects";
import mergeStringArray from "./bin/functions/mergeStringArray";
import cleanString from "./bin/functions/cleanString";
import compareStrings from "./bin/functions/compareStrings";
import computeProgress from "./bin/functions/computeProgress";
import computeArrayWeights from "./bin/functions/computeArrayWeights";
import sortByWeights from "./bin/functions/sortByWeights";
import rotateArray from "./bin/functions/rotateArray";

export {
    classNames,
    mergeObjects,
    mergeStringArray,
    limitNumber,
    cleanString,
    compareStrings,
    computeProgress,
    computeArrayWeights,
    sortByWeights,
    rotateArray,

    DateConverter,
    StringExtractor,
    StringProcessor,
    StorageController,
    MakeFormData,
    Random,
    MakeElement
};
