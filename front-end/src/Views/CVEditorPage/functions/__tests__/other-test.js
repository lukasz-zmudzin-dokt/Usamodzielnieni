jest.mock('fetch');
import { sendData } from 'Views/CVEditorPage/functions/other.js';

it('correct url is called', () => {
    global.open = jest.fn();
    sendData({ name: "Jan Kowalski " }).then(() => {
        expect(global.open).toHaveBeenCalledWith("CV_Jan_Kowalski");
    })
});