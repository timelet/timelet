import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from 'chai';
import Duration from './Duration';
import TestApp from '../views/App.test';

describe('Duration component', () => {
  it('shows seconds as minutes and seconds', () => {
    render(<Duration seconds={100} />, { wrapper: TestApp });
    expect(screen.getByText(/1min 40s/i).textContent).to.contain('1min 40s');
  });
});
