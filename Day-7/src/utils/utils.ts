const TOTAL_DISK_SPACE = 70000000;
const REQUIRED_DISK_SPACE = 30000000;

export const solution = (data: string) => {
    const streamList = parseInput(data);
    const root = createDirectory('root', null, null);
    executeCommands(root, streamList);

    setDirectorySize(root);
    console.log('Answer 1: ', getTotalSizeOfDirectoriesUnderMaxSize(root, 100000));

    const results = findDirectoryToRemove(root);

    console.log('Answer 2: ', results ? results.size : 0);
};

export type File = {
    name: string;
    size: number;
};

export type Directory = {
    name: string;
    size: number | null;
    contents?: (Directory | File)[];
    parentDirectory: Directory | null;
};

export type Command = {
    command: keyof typeof CommandFactory;
    args: string[];
};

type StreamLocation = {
    streamList: string[];
    index: number;
};

export const parseInput = (stream: string) => stream.split('\n');

// TODO: write tests
export const findDirectoryToRemove = (directory: Directory) => {
    const directories = flattenAndSortDirectories(directory).reverse();
    const takenSpace = directories[directories.length - 1].size || 0;
    const availableSpace = TOTAL_DISK_SPACE - takenSpace;
    const delta = REQUIRED_DISK_SPACE - availableSpace;

    return directories.find((directory) => {
        const answer = directory.size && directory.size >= delta;
        return answer;
    });
};

export const flattenAndSortDirectories = (directory: Directory) => {
    const directories: Directory[] = [];

    directory.contents?.forEach((child) => {
        if ('contents' in child) {
            directories.push(...flattenAndSortDirectories(child));
        }
    });

    directories.push(directory);

    return directories.sort((a, b) => (a.size && b.size ? b.size - a.size : 1));
};

export const getTotalSizeOfDirectoriesUnderMaxSize = (directory: Directory, maxSize: number) => {
    const directoriesWithMaxSize = getDirectoriesWithSizeSmallerThanMax(directory, maxSize);

    return directoriesWithMaxSize.reduce<number>((acc, directory) => acc + (directory.size || 0), 0);
};

// TODO: write tests
export const executeCommands = (root: Directory, streamList: string[]) => {
    let currentDirectory = root;

    streamList.forEach((stream, index) => {
        const command = isCommand(stream);

        if (command) {
            const commandFunction = CommandFactory[command.command];

            if (command.command === 'cd') {
                currentDirectory = commandFunction(currentDirectory, command, { streamList, index }) as Directory;
            } else {
                commandFunction(currentDirectory, command, { streamList, index });
            }
        }
    });
};

export const getDirectoriesWithSizeSmallerThanMax = (directory: Directory, maxSize: number) => {
    const directories: Directory[] = [];

    directory.contents?.forEach((child) => {
        if ('contents' in child) {
            directories.push(...getDirectoriesWithSizeSmallerThanMax(child, maxSize));
        }
    });

    if (directory.size && directory.size <= maxSize) {
        directories.push(directory);
    }

    return directories;
};

export const changeDirectory = (currentDirectory: Directory, command: Command, _: StreamLocation): Directory => {
    const { args } = command;
    if (args[0] === '..' && currentDirectory.parentDirectory) {
        return currentDirectory.parentDirectory;
    } else {
        if (currentDirectory.contents) {
            const directory = currentDirectory.contents.find((childDirectory) => childDirectory.name === args[0]);
            if (directory && 'contents' in directory) {
                return directory;
            }
        }
    }

    return currentDirectory;
};

/**
 * Translates a list of directory contents into a list of files or directories and sets that list as the parent directory's contents
 */
export const listContents = (currentDirectory: Directory, command: Command, streamLocation: StreamLocation) => {
    const listOfContents = getContentsList(currentDirectory, streamLocation);

    if (listOfContents.length) {
        currentDirectory.contents = listOfContents;
    }
};

/**
 * Translates a list of directory contents in a list of files or directories
 */
export const getContentsList = (currentDirectory: Directory, streamLocation: StreamLocation) => {
    const { streamList, index } = streamLocation;
    const streamListCopy = [...streamList].slice(index + 1, streamList.length);

    return streamListCopy.reduce<(File | Directory)[]>((acc: (File | Directory)[], line: string) => {
        const directory = isDirectory(line);
        const file = isFile(line);

        if (!directory && !file) {
            streamListCopy.splice(1);
            return [...acc];
        }

        let result: File | Directory | undefined = undefined;

        if (directory) {
            result = createDirectory(directory.name, currentDirectory, null);
        } else if (file) {
            result = createFile(file.name, file.size);
        }

        return [...acc, result] as (Directory | File)[];
    }, [] as (Directory | File)[]);
};

/**
 * Iterates over entire directory tree and sets the size of each directory
 * Opportunities for refactoring: Instead of modifying the original obj, try creating a new one and returning it
 */
export const setDirectorySize = (directory: Directory): number => {
    if (!directory.size && directory.contents) {
        directory.size = directory.contents.reduce((acc: number, child: Directory | File) => {
            if ('size' in child && child.size !== null) {
                return acc + (child.size || 0);
            } else {
                return acc + setDirectorySize(child as Directory);
            }
        }, 0);
    }

    return directory.size || 0;
};

const CommandFactory = {
    cd: changeDirectory,
    ls: listContents,
};

export const createDirectory = (
    name: string,
    parentDirectory: Directory | null,
    size: number | null,
    contents?: (Directory | File)[]
): Directory => ({
    name,
    parentDirectory,
    size,
    contents,
});

export const createFile = (name: string, size: number): File => ({
    name,
    size,
});

export const isCommand = (stream: string): Command | undefined => {
    if (stream[0] === '$') {
        const slicedCommand = stream.slice(2, stream.length);
        const splitCommand = slicedCommand.split(' ');
        const commandName = splitCommand[0];

        return {
            command: commandName as keyof typeof CommandFactory,
            args: splitCommand.slice(1, splitCommand.length),
        };
    }
};

export const isDirectory = (stream: string): Pick<Directory, 'name'> | undefined => {
    if (stream.startsWith('dir')) {
        return {
            name: stream.slice(4, stream.length),
        };
    }
};

export const isFile = (command: string): File | undefined => {
    if (Number(command[0]) || command[0] === '0') {
        const results = getFirstNumberFromArray(command.split(''));

        if (results) {
            const { number: size, end } = results;
            const name = command.slice(end + 2, command.length);

            return {
                name,
                size,
            };
        }
    }
};

export const getFirstNumberFromArray = (arr: string[]) => {
    let indexOfFirstQuantityNumber: number | undefined;

    let numberLoopStoppedAt = 0;
    for (let i = 0; !Number(arr[i]) && arr[i] !== '0' && i < arr.length; i++) {
        numberLoopStoppedAt = i;
    }

    if (numberLoopStoppedAt === arr.length && !Number(arr[numberLoopStoppedAt]) && arr[numberLoopStoppedAt] !== '0') {
        return;
    }

    indexOfFirstQuantityNumber = numberLoopStoppedAt;

    if (indexOfFirstQuantityNumber !== undefined) {
        let indexOfLastQuantityNumber = indexOfFirstQuantityNumber;

        for (let i = indexOfFirstQuantityNumber + 1; Number(arr[i]) || arr[i] === '0'; i++) {
            indexOfLastQuantityNumber = i;
        }

        const number = createNumberFromRange(indexOfFirstQuantityNumber, indexOfLastQuantityNumber, arr);

        return {
            number,
            start: indexOfFirstQuantityNumber,
            end: indexOfLastQuantityNumber,
        };
    }
};

export const createNumberFromRange = (firstIndex: number, lastIndex: number, arr: string[]) => {
    let number = '';
    for (let i = firstIndex; i <= lastIndex; i++) {
        number += arr[i];
    }

    if (Number(number) || number === '0') {
        return Number(number);
    } else {
        throw new Error(`could not convert ${number} to a number`);
    }
};
