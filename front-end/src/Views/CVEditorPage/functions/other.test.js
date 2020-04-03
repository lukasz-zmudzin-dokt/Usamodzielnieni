
import { sendData } from './other.js';

describe('ActionWithDate', () => {
    let failFetch;
    let failFetchUrl;
    let cv, file, token;
    beforeAll(() => {
        cv = { name: "Jan Kowalski" };
        file = new File([""], "filename");
        token = '123';
        global.fetch = jest.fn().mockImplementation((input, init) => {
            return new Promise((resolve, reject) => {
                if (init.method === failFetch && input === failFetchUrl) {
                    resolve({ status: 500 });
                }
                switch (init.method) {
                    case "DELETE":
                        resolve({ status: 200 });
                        break;
                    case "POST":
                        resolve({ status: init.body ? 201 : 400 });
                        break;
                    default:
                        resolve({ 
                            status: 200,
                            json: () => Promise.resolve("/CV_Jan_Kowalski")
                        });
                        break;
                }
            });
        });
    });
    
    beforeEach(() => {
        failFetch = null;
        failFetchUrl = null;
    })
    
    it('should call correct url when photo is undefined', async () => {
        global.open = jest.fn();
        await sendData(cv, null, token);
        await expect(global.open).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/CV_Jan_Kowalski",
            "_blank"
        );
    });
    
    it('should call correct url when photo is defined', async () => {
        global.open = jest.fn();
        await sendData(cv, file, token);
        await expect(global.open).toHaveBeenCalledWith(
            "https://usamo-back.herokuapp.com/CV_Jan_Kowalski",
            "_blank"
        );
    });

    it('should throw an error when delete api return wrong status', async () => {
        failFetch = 'DELETE';
        failFetchUrl = 'https://usamo-back.herokuapp.com/cv/generate/'
        await expect(sendData(cv, file, token)).rejects.toThrow('api error');
    })

    it('should throw an error when get api return wrong status', async () => {
        failFetch = 'GET';
        failFetchUrl = 'https://usamo-back.herokuapp.com/cv/generate/'
        await expect(sendData(cv, file, token)).rejects.toThrow('api error');
    })

    it('should throw an error when post cv api return wrong status', async () => {
        failFetch = 'POST';
        failFetchUrl = 'https://usamo-back.herokuapp.com/cv/generate/'
        await expect(sendData(cv, file, token)).rejects.toThrow('api error');
    })

    it('should throw an error when post photo api return wrong status', async () => {
        failFetch = 'POST';
        failFetchUrl = 'https://usamo-back.herokuapp.com/cv/picture/'
        await expect(sendData(cv, file, token)).rejects.toThrow('api error');
    })
});