import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { AuthContext } from './../../../auth/authContext';
import { LoginScreen } from './../../../Components/login/LoginScreen';
import { types } from './../../../types/types';

// !important when you are using jest.mock remenber use mock<FunctionName> for easily mock without break scope variables
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('LoginScreen', () => { 

    const contextVal = {
        user: {
            name: 'rabindranath'
        },
        dispatch: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path='/login' element={ <LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>   
    );

   it('Should render LoginScreen component with user authenticated', () => {

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').text().trim()).toBe('Login');
   }); 

   it('Should render LoginScreen with user authenticated, login btn and make login successfuly and redirect to Marvel as based parameter', () => {

    wrapper.find('button').prop('onClick')();

    expect(wrapper.find('button').text().trim()).toBe('Login');
    expect(contextVal.dispatch).toHaveBeenCalled();
    expect(contextVal.dispatch).toHaveBeenCalledWith({
        type: types.login,
        payload: { name: 'rabindranath'}
    });
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/marvel', {'replace': true});
  }); 

    it('Should render LoginScreen with user authenticated, login btn and make login successfuly and redirect to dc as saved in localStorage', () => {
    
        localStorage.setItem('lastPath', '/dc');
        wrapper.find('button').prop('onClick')();
    
        expect(wrapper.find('button').text().trim()).toBe('Login');
        expect(contextVal.dispatch).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/dc', {'replace': true});
    }); 

});