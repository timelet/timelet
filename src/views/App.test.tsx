import * as React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App>', () => {
  it('renders the App', () => {
    const { getByText } = render(<App />);
    // const linkElement = getByText(/learn react/i);
    // expect(document.body.contains(linkElement));
  });
});
