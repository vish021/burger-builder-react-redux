import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);//JSX code 
        expect(wrapper.find(NavigationItem)).toHaveLength(2);//not JSX but just a function or a class
    });
});