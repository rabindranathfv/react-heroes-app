import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { PrivateRoute } from './../../routers/PrivateRoute';
import { AuthContext } from './../../auth/authContext';
import { DashboardRoutes } from './../../routers/DashboardRoutes';

// !important when you are using jest.mock remenber use mock<FunctionName> for easily mock without break scope variables
const mockLocation = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => mockLocation,
    Navigate: () => mockNavigate
}));

describe('PrivateRoute', () => { 

    Storage.prototype.setItem = jest.fn();

   it('Should render PrivateRoute if users is authenticated', () => {
    const contextVal = {
        user: {
            name: 'rabindranath',
            logged: true
        }
    };
    const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={['/']}>
                <PrivateRoute>
                    <DashboardRoutes />
                </PrivateRoute>
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    expect(wrapper).toMatchSnapshot();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(wrapper.find('Navbar').exists()).toBeTruthy();
    expect(wrapper.find('.container').exists()).toBeTruthy();
   }); 

   it('Should render PrivateRoute if users is not authenticated and redirected to login', () => {
    const contextVal = {
        user: {
            name: 'rabindranath',
            logged: false
        }
    };
    const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={['/']}>
                <PrivateRoute>
                    <h1>reditect to login</h1>
                </PrivateRoute>
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    expect(wrapper.find('Navigate').exists()).toBeTruthy();
    expect(wrapper.find('Navigate').prop('to')).toBe('/login')
   }); 

 
});