import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { AuthContext } from './../../../auth/authContext';
import { Navbar } from './../../../Components/ui/Navbar';

// !important when you are using jest.mock remenber use mock<FunctionName> for easily mock without break scope variables
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('SearchScreen', () => { 

    const contextVal = {
        user: {
            logged: true,
            name: 'rabindranath'
        },
        dispatch: jest.fn()
    }

   it('Should render Navbar component with user authenticated', () => {
       const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={ <Navbar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('rabindranath');
   }); 

   it('Should render Navbar Screen with user authenticated, logout btn and make logout successfuly', () => {
    const wrapper = mount(
     <AuthContext.Provider value={contextVal} > 
         <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={ <Navbar />} />
                </Routes>
            </MemoryRouter>
     </AuthContext.Provider>   
    );

    wrapper.find('button').simulate('click');

    expect(wrapper.find('button').text().trim()).toBe('Logout');
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login', {'replace': true})
    }); 

});