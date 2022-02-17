import { AppRouter } from '../../routers/AppRouter';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';

describe('AppRouter:::', () => {

    it('Should show login route if use is not authenticated', () => {
        const contextVal = {
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextVal} > 
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');
    });

    it('Should show DashboardRoutes route if use is authenticated', () => {
        const contextVal = {
            user: {
                logged: true,
                name: 'rabindranath'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextVal} > 
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
    });
});