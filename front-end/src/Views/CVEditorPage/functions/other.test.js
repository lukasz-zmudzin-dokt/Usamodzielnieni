
import { sendData } from './other.js';
jest.mock('fetch');

describe('ActionWithDate', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('correct url is called', () => {
        global.open = jest.fn();
        sendData({ name: "Jan Kowalski " }).then(() => {
            expect(global.open).toHaveBeenCalledWith("CV_Jan_Kowalski");
        })
    });
});