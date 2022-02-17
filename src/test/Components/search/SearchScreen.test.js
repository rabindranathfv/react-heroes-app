import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { SearchScreen } from './../../../Components/search/SearchScreen';
import { AuthContext } from './../../../auth/authContext';

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
        }
    }

   it('Should render search Screen with route as search and user authenticated', () => {
       const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={ ['/search']}>
                <SearchScreen />
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button').text().trim()).toBe('Search...');
    expect(wrapper.find('input').prop('name')).toBe('searchText');
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a heroe');
   }); 

   it('Should render batman after search this heroe', () => {
    const wrapper = mount(
     <AuthContext.Provider value={contextVal} > 
         <MemoryRouter initialEntries={ ['/search?q=batman']}>
             <SearchScreen />
         </MemoryRouter>
     </AuthContext.Provider>   
    );
    
    const inputHeroe = wrapper.find('input').prop('value');
    wrapper.find('button').simulate('click');
    const resultsInfo = wrapper.find('#results');
    expect(wrapper).toMatchSnapshot();
    expect(inputHeroe).toBe('batman');
    expect(resultsInfo.text().trim()).toBe('Results');
    }); 

    it('Should render batmanFEAR after search this heroe', () => {
        const wrapper = mount(
         <AuthContext.Provider value={contextVal} > 
             <MemoryRouter initialEntries={ ['/search?q=batmanFEAR']}>
                 <SearchScreen />
             </MemoryRouter>
         </AuthContext.Provider>   
        );
        
        const inputHeroe = wrapper.find('input').prop('value');
        wrapper.find('button').simulate('click');
        const alert = wrapper.find('.alert-danger');
        expect(wrapper).toMatchSnapshot();
        expect(inputHeroe).toBe('batmanFEAR');
        expect(alert.text().trim()).toBe('there is no resutls: batmanFEAR');
    }); 

    it('Should trigger submit form for redirection', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextVal} > 
                <MemoryRouter initialEntries={ ['/search']}>
                    <SearchScreen />
                </MemoryRouter>
            </AuthContext.Provider>   
           );
        
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => ({})
        })

        expect(mockNavigate).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
    });

});