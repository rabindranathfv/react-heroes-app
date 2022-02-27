import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { AuthContext } from './../../../auth/authContext';
import { LoginScreen } from './../../../Components/login/LoginScreen';

// !important when you are using jest.mock remenber use mock<FunctionName> for easily mock without break scope variables
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('LoginScreen', () => { 

    const contextVal = {
        user: {
            logged: true,
            name: 'rabindranath'
        },
        dispatch: jest.fn()
    }

   it('Should render LoginScreen component with user authenticated', () => {
       const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path='/login' element={ <LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').text().trim()).toBe('Login');
   }); 

   it('Should render LoginScreen with user authenticated, login btn and make login successfuly and redirect to Marvel as based parameter', () => {
    const wrapper = mount(
     <AuthContext.Provider value={contextVal} > 
         <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path='/login' element={ <LoginScreen />} />
                </Routes>
            </MemoryRouter>
     </AuthContext.Provider>   
    );

    wrapper.find('button').prop('onClick')();

    expect(wrapper.find('button').text().trim()).toBe('Login');
    expect(contextVal.dispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/marvel', {'replace': true});
    }); 

});