import React from 'react';
import { IntlProvider } from 'react-intl';

type TestAppProps = React.PropsWithChildren<unknown>;

export default function TestApp({ children }: TestAppProps) {
  return <IntlProvider locale="en">{children}</IntlProvider>;
}

describe('<App>', () => {
  it('renders the App', () => {
    // const { getByText } = render(<App />);
    // const linkElement = getByText(/learn react/i);
    // expect(document.body.contains(linkElement));
  });
});
