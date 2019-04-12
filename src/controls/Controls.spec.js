// Test away!
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import { render, fireEvent, waitForElement } from 'react-testing-library';

import Controls from './Controls';


describe('Controls Component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
    
        ReactDOM.render(<Controls/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(<Controls></Controls>);
        expect(tree.toJSON()).toMatchSnapshot()
    });   

});

describe('Controls', () => {
    it('should fire the closed gate button', ()=> {
        const closed = jest.fn();
        const { getByText } = render(<Controls toggleClosed ={closed} />);

        fireEvent.click(getByText(/Close Gate/i));
    
        expect(closed).toHaveBeenCalled();

    });


    it('should fire the open gate button', ()=> {
        const opened = jest.fn();
        const props = {
            closed: true 
        }
        const { getByText } = render(<Controls {...props} toggleClosed ={opened} />);

        fireEvent.click(getByText(/Open Gate/i));
    
        expect(opened).toHaveBeenCalled();

    });

    it('should fire the lock gate button', ()=> {
        const locked = jest.fn();
        const props = {
            locked: false,
            closed: true 
        }
        const { getByText } = render(<Controls {...props} toggleLocked = {locked} />);

        fireEvent.click(getByText(/Lock Gate/i));
    
        expect(locked).toHaveBeenCalled();

    });

    it('should fire the unlock gate button', ()=> {
        const unlocked = jest.fn();
        const props = {
            locked: true,
            closed: true
        }

        const { getByText } = render(<Controls {...props} toggleLocked = {unlocked} />)

        fireEvent.click(getByText(/Unlock Gate/i));

        expect(unlocked).toHaveBeenCalled();
    })
});