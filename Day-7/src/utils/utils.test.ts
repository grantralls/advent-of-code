import {
    Command,
    createDirectory,
    getContentsList,
    isCommand,
    isDirectory,
    isFile,
    listContents,
    Directory,
    changeDirectory,
    setDirectorySize,
    getDirectoriesWithSizeSmallerThanMax,
    flattenAndSortDirectories,
    solution,
} from './utils';
import { readFileSync } from 'fs';

describe('examples', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const data = readFileSync('src/utils/example-input.txt', 'utf8');
    solution(data);

    it('should return 95437 for part one', () => {
        expect(consoleSpy).toHaveBeenCalledWith('Answer 1: ', 95437);
    });

    it('should return 95437 for part one', () => {
        expect(consoleSpy).toHaveBeenCalledWith('Answer 2: ', 24933642);
    });
});

describe('isCommand', () => {
    it('should return undefined if the string is not a command', () => {
        expect(isCommand('hello')).toBeUndefined();
    });

    it('should return test for the command when given', () => {
        expect(isCommand('$ test')).toEqual({ command: 'test', args: [] });
    });

    it('should return a single arg when given', () => {
        expect(isCommand('$ test arg')).toEqual({ command: 'test', args: ['arg'] });
    });

    it('should return a multiple args when given', () => {
        expect(isCommand('$ test arg1 arg2 arg3')).toEqual({ command: 'test', args: ['arg1', 'arg2', 'arg3'] });
    });
});

describe('isDirectory', () => {
    it('should return undefined if the string is not a directory', () => {
        expect(isDirectory('hello')).toBeUndefined();
    });

    it('should return a directory object when given', () => {
        expect(isDirectory('dir test')).toEqual({ name: 'test' });
    });
});

describe('isFile', () => {
    const currentDirectory = createDirectory('someDir', null, null);

    it('should return undefined if the string is not a file', () => {
        expect(isFile('hello')).toBeUndefined();
    });

    it('should return a file object named test of size 10 when given', () => {
        expect(isFile('10 test')).toEqual({ name: 'test', size: 10 });
    });

    it('should return a file object named test of size 10 when given size 010', () => {
        expect(isFile('010 test')).toEqual({ name: 'test', size: 10 });
    });

    it('should return a file object name test of size 100 when given size 00101', () => {
        expect(isFile('00101 test')).toEqual({ name: 'test', size: 101 });
    });
});

describe('getContentsList', () => {
    it('should list the results of ls', () => {
        const stream = readFileSync('src/utils/example-input.txt', 'utf8');
        const streamList = stream.split('\n').slice(1, 4);
        const currentDirectory = createDirectory('someDir', null, null);

        const results = getContentsList(currentDirectory, { streamList, index: 0 });

        expect(results[0]).toEqual({
            name: 'a',
            contents: undefined,
            parentDirectory: currentDirectory,
            size: null,
        });
        expect(results[1]).toEqual({ name: 'b.txt', size: 14848514 });
    });

    it('should not return any commands that come after the content stream', () => {
        const stream = readFileSync('src/utils/example-input.txt', 'utf8');
        const streamList = stream.split('\n').slice(0, 7);
        const currentDirectory = createDirectory('someDir', null, null);
        const results = getContentsList(currentDirectory, { streamList, index: 1 });

        expect(streamList.length).toEqual(7);
        expect(results.length).toEqual(4);
    });
});

describe('listContents', () => {
    const stream = readFileSync('src/utils/example-input.txt', 'utf8');
    const streamList = stream.split('\n').slice(1, 4);
    const currentDirectory = createDirectory('someDir', null, null);
    listContents(currentDirectory, isCommand(streamList[0]) as Command, { streamList, index: 0 });
    const contents = currentDirectory.contents as (File | Directory)[];

    it('should add the directory to the directory', () => {
        expect(contents[0].name).toEqual('a');
        expect((contents[0] as any).contents).toBeUndefined();
        expect(contents[0].size).toBeNull();
        expect((contents[0] as any).parentDirectory).toEqual(currentDirectory);
    });

    it('should add the file to the directory', () => {
        expect(contents[1].name).toEqual('b.txt');
        expect(contents[1].size).toEqual(14848514);
    });
});

describe('changeDirectory', () => {
    it('should change from the root directory to a child directory', () => {
        const childDirectory = createDirectory('a', null, 10);
        const parentDirectory = createDirectory('someDir', null, 10, [childDirectory]);
        const newDirectory = changeDirectory(
            parentDirectory,
            { command: 'cd', args: ['a'] },
            { streamList: [''], index: 0 }
        );

        expect(newDirectory).toEqual(childDirectory);
    });

    it('should change from a child directory to a parent directory', () => {
        const parentDirectory = createDirectory('someDir', null, 10, []);
        const childDirectory = createDirectory('a', parentDirectory, 10);
        const newDirectory = changeDirectory(
            childDirectory,
            { command: 'cd', args: ['..'] },
            { streamList: [''], index: 0 }
        );

        expect(newDirectory).toEqual(parentDirectory);
    });
});

describe('getDirectorySize', () => {
    it('should add file sizes within current directory', () => {
        const currentDirectory = createDirectory('someDir', null, null, [
            {
                name: 'a.txt',
                size: 10,
            },
            {
                name: 'b.txt',
                size: 20,
            },
        ]);

        expect(setDirectorySize(currentDirectory)).toEqual(30);
    });

    it('should add file sizes within current directory', () => {
        const currentDirectory = createDirectory('someDir', null, null, [
            {
                name: 'a.txt',
                size: 10,
            },
            {
                name: 'a',
                parentDirectory: null,
                size: null,
                contents: [
                    {
                        name: 'b.txt',
                        size: 30,
                    },
                ],
            },
        ]);
        const results = setDirectorySize(currentDirectory);

        expect(results).toEqual(40);
        expect(currentDirectory.size).toEqual(40);
        expect((currentDirectory.contents as Directory[])[1].size).toEqual(30);
    });
});

describe('setDirectorySize', () => {
    it('should add file sizes within current directory', () => {
        const currentDirectory = createDirectory('someDir', null, null, [
            {
                name: 'a.txt',
                size: 10,
            },
            {
                name: 'b.txt',
                size: 20,
            },
        ]);

        setDirectorySize(currentDirectory);
        expect(currentDirectory.size).toEqual(30);
    });

    it('should add file sizes within sub directory', () => {
        const currentDirectory = createDirectory('someDir', null, null, [
            {
                name: 'a.txt',
                size: 10,
            },
            {
                name: 'a',
                parentDirectory: null,
                size: null,
                contents: [
                    {
                        name: 'b.txt',
                        size: 30,
                    },
                ],
            },
        ]);

        setDirectorySize(currentDirectory);

        expect(currentDirectory.size).toEqual(40);
        expect((currentDirectory.contents as Directory[])[1].size).toEqual(30);
    });
});

describe('getDirectoriesWithSizeSmallerThanMax', () => {
    const directory = createDirectory('someDir', null, 70, [
        {
            name: 'a',
            parentDirectory: null,
            size: 30,
            contents: [
                {
                    name: 'b.txt',
                    size: 30,
                },
            ],
        },
        {
            name: 'b.txt',
            size: 40,
        },
    ]);

    it('should return the directory with the max size when the parent is not included', () => {
        const results = getDirectoriesWithSizeSmallerThanMax(directory, 40);

        expect(results).toEqual([
            {
                name: 'a',
                parentDirectory: null,
                size: 30,
                contents: [
                    {
                        name: 'b.txt',
                        size: 30,
                    },
                ],
            },
        ]);
    });

    it('should include the parent if it falls within the limit', () => {
        const results = getDirectoriesWithSizeSmallerThanMax(directory, 70);

        expect(results).toEqual([
            {
                name: 'a',
                parentDirectory: null,
                size: 30,
                contents: [
                    {
                        name: 'b.txt',
                        size: 30,
                    },
                ],
            },
            {
                contents: [
                    {
                        contents: [
                            {
                                name: 'b.txt',
                                size: 30,
                            },
                        ],
                        name: 'a',
                        parentDirectory: null,
                        size: 30,
                    },
                    {
                        name: 'b.txt',
                        size: 40,
                    },
                ],
                name: 'someDir',
                parentDirectory: null,
                size: 70,
            },
        ]);
    });
});

describe('flattenAndSortDirectories', () => {
    it('should flatten the directory', () => {
        const directory = createDirectory('someDir', null, 70, [
            {
                name: 'a',
                parentDirectory: null,
                size: 30,
                contents: [
                    {
                        name: 'b.txt',
                        size: 30,
                    },
                ],
            },
            {
                name: 'b.txt',
                size: 40,
            },
        ]);

        const results = flattenAndSortDirectories(directory);

        expect(results).toEqual([
            {
                contents: [
                    { contents: [{ name: 'b.txt', size: 30 }], name: 'a', parentDirectory: null, size: 30 },
                    { name: 'b.txt', size: 40 },
                ],
                name: 'someDir',
                parentDirectory: null,
                size: 70,
            },
            { contents: [{ name: 'b.txt', size: 30 }], name: 'a', parentDirectory: null, size: 30 },
        ]);
    });
});
