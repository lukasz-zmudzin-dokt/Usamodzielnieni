jest.mock('fetch');
import React from 'react';
import ReactDOM from 'react-dom';
import { getUserData } from 'Views/UserProfilePage/functions/getUserData.js';
import UserProfilePage from '../../UserProfilePage';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

    it('fetches data from server when server returns a successful response', done => {
        const mockSuccessResponse = {
            data: {
                data: {
                    username: "test",
                    first_name: "test",
                    last_name: "test",
                    email: "test@test.com",
                    phone_number: "+48111122223333"
                }
            }
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
        const mockFetchPromise = Promise.resolve({ 
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        
        const wrapper = shallow(<UserProfilePage />); 
                                
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('http://usamo-back.herokuapp.com/account/data', {"headers": {"Authorization": "token undefined", "Content-Type": "application/json"}, "method": "GET"});
    
        //process.nextTick(() => { 
        //  expect(wrapper.state()).toEqual({
        //        user: {
        //            username: "test",
        //            first_name: "test",
        //            last_name: "test",
        //           email: "test@test.com",
        //            phone_number: "+48111122223333"
        //        }
        //  });
    
          global.fetch.mockClear(); 
          done(); 
        });