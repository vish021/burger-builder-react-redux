import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    //Executes before each test
    let wrapper;
    beforeEach(() => {
        wrapper =  shallow(<NavigationItems />);//JSX code 
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);//not JSX but just a function or a class
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        //wrapper = shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated: true});// set props before running test
        expect(wrapper.find(NavigationItem)).toHaveLength(3);//not JSX but just a function or a class
    });

    it('should render Logout elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});// set props before running test
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});