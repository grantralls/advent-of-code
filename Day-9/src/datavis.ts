import { readFile } from 'fs/promises';
import { Rope } from './utils/Rope';

readFile('src/utils/example-input-2.txt', 'utf8').then((data) => {
    const rope = new Rope(data.split('\n'), 10);
    rope.executeInstructions();
    rope.printRope();
});
