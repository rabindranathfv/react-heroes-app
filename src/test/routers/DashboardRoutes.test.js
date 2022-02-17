import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from './../../auth/authContext';

describe('DashboardRoutes', () => { 

    const contextVal = {
        user: {
            logged: true,
            name: 'rabindranath'
        }
    }

   it('Should render Dashboard routes with user authenticated in navbar with route based as marvel', () => {
       const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={ ['/']}>
                <DashboardRoutes />
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('rabindranath');
   }); 

   it('Should render Dashboard routes with user authenticated in navbar with route dc', () => {
    const wrapper = mount(
     <AuthContext.Provider value={contextVal} > 
         <MemoryRouter initialEntries={ ['/dc']}>
             <DashboardRoutes />
         </MemoryRouter>
     </AuthContext.Provider>   
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('DCScreen');
    });

    it('Should render Dashboard routes with user authenticated in navbar with route search', () => {
        const wrapper = mount(
         <AuthContext.Provider value={contextVal} > 
             <MemoryRouter initialEntries={ ['/search']}>
                 <DashboardRoutes />
             </MemoryRouter>
         </AuthContext.Provider>   
        );
    
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Searchs');
    });

});