import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import { unmountComponentAtNode } from "react-dom";
import { act, render } from '@testing-library/react';

it('App component renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

it('fetch() works', () => {
  act(() => {
    render(<App />)
  });
  expect(container.textContent).toBe('');
})
 
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
