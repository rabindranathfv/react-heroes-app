import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { AuthContext } from './../../../auth/authContext';
import { HeroScreen } from './../../../Components/hero/HeroScreen';

// !important when you are using jest.mock remenber use mock<FunctionName> for easily mock without break scope variables
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('HeroScreen', () => { 

    const contextVal = {
        user: {
            name: 'rabindranath'
        },
        dispatch: jest.fn()
    }

   it('Should render default view with no hero because does not exist', () => {
    const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={['/hero/']}>
                <Routes>
                    <Route path='/hero' element={ <HeroScreen />} />
                    <Route path='/' element={ <h1>No Hero id </h1>} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('No Hero id');
   }); 

   it('Should render HeroScreen with hero', () => {

    const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={ <HeroScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.row').exists()).toBeTruthy();
    expect(wrapper.find('img').prop('alt').trim()).toBe('Spider Man');
    expect(wrapper.find('.list-group-item').at(0).text().trim()).toBe('Alter ego: Peter Parker');
  }); 

  it('Should render HeroScreen and go back screen', () => {

    const wrapper = mount(
        <AuthContext.Provider value={contextVal} > 
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={ <HeroScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>   
    );

    wrapper.find('button').simulate('click');

    expect(wrapper).toMatchSnapshot();
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});