import { CPU } from '../CentralProcessingUnit';

export const solution = (data: string) => {
    const instructionSet = data.split('\n');
    const cpu = new CPU(instructionSet);
    console.log('Answer 1:', cpu.sumSignalStrengths());
};

export const dataVisualization = (data: string) => {
    const instructionSet = data.split('\n');
    const cpu = new CPU(instructionSet);
    cpu.DataVisualization();
};
