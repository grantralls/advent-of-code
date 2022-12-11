import { CommunicationDevice } from '../CommunicationDevice';

export const solution = (data: string) => {
    const instructionSet = data.split('\n');
    const motherboard = new CommunicationDevice(instructionSet);
    console.log('Answer 1:', motherboard.sumSignalStrengths);
};

export const dataVisualization = (data: string) => {
    const instructionSet = data.split('\n');
    const motherboard = new CommunicationDevice(instructionSet);
    motherboard.DataVisualization();
};
