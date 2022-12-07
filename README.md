# Advent of Code 2022

_written in Typescript using Node_

## Running Tests

_tests written with Jest_

Each solution has a utils folder which contains `utils.ts`, `utils.test.ts`, and possible some test input. `utils.ts` contains the utility/helper functions used in the final solution. No tests are written for `index.ts` therefore the vast majority of the logic lives in a utils function and is tested there.

1. Install [nvm](https://github.com/nvm-sh/nvm)
2. Use the terminal to navigate to the root folder of this repo
3. Run `nvm use` to use the node version specified in the .nvmrc
4. `cd` into the solution directory of choice
5. Install the dependencies with `npm i`
6. Run the test with `npm run test`

## Running Solutions

Each folder is an individual node program duplicated from `Day-template`. To run a solution do the following.

1. Install [nvm](https://github.com/nvm-sh/nvm)
2. Use the terminal to navigate to the root folder of this repo
3. Run `nvm use` to use the node version specified in the .nvmrc
4. `cd` into the solution directory of choice
5. Install the dependencies with `npm i`
6. Run `npm run start`
