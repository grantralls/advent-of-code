import { CommunicationDevice } from '../CommunicationDevice';

export const solution = (data: string) => {
    const instructionSet = data.split('\n');
    const communicationDevice = new CommunicationDevice(instructionSet);
    console.log('Answer 1:', communicationDevice.sumSignalStrengths);
};

export const dataVisualization = (data: string) => {
    const instructionSet = data.split('\n');
    const communicationDevice = new CommunicationDevice(instructionSet);
    communicationDevice.DataVisualization();
};
