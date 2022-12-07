import { returnToSender } from './utils';

describe('returnToSender', () => {
    it('should return the message', () => {
        expect(returnToSender('Hello')).toEqual('Hello');
    });
});
