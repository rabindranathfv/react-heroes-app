import { AppRouter } from '../../routers/AppRouter';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';

const contextVal = {
    user: {
        logged: false
    }
}
describe('AppRouter:::', () => {

    let wrapper = mount(
    <AuthContext.Provider value={contextVal} > 
        <AppRouter />
    </AuthContext.Provider>
    );

    beforeEach(() => {
        wrapper = mount(
            <AuthContext.Provider value={contextVal} > 
                <AppRouter />
            </AuthContext.Provider>
            );
    });

    it('Should show login route if use is not authenticated', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');
    });
});