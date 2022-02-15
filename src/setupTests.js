
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// imports testing using ENZYME
import {createSerializer} from 'enzyme-to-json';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "jest-enzyme";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer( createSerializer({mode: 'deep'}));