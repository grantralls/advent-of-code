/**
 *
 * @param datastream
 * @param numberOfUniqueValues
 * @returns the index after the first instance of n unique values
 */
export const getStartOfIndex = (datastream: string, numberOfUniqueValues: number) =>
    datastream.split('').reduce((acc: number, _: string, currentIndex: number, datastream: string[]) => {
        const arrayToCheck = datastream.slice(currentIndex, currentIndex + numberOfUniqueValues);

        const mySet = new Set(arrayToCheck);

        if (mySet.size === numberOfUniqueValues) {
            datastream.splice(1);
            return currentIndex + numberOfUniqueValues;
        }

        return acc;
    }, 0);
