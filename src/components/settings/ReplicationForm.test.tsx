import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import * as sinon from 'sinon';
import TestApp from '../../views/App.test';
import ReplicationForm from './ReplicationForm';

describe('ReplicationForm component', () => {
  it('renders empty form, if no server parameters is provided', () => {
    render(<ReplicationForm saveUrl={sinon.fake()} />, { wrapper: TestApp });
    expect((screen.getByLabelText('Hostname') as HTMLInputElement).value).to.equal('');
    expect((screen.getByLabelText('Database') as HTMLInputElement).value).to.equal('');
    expect((screen.getByLabelText('Username') as HTMLInputElement).value).to.equal('');
    expect((screen.getByLabelText('Password') as HTMLInputElement).value).to.equal('');
  });
  it('uses the url property as the inputs default values', () => {
    render(<ReplicationForm saveUrl={sinon.fake()} url="https://shaw:IMissYouR00t@example.com/poi" />, { wrapper: TestApp });
    expect((screen.getByLabelText('Hostname') as HTMLInputElement).value).to.equal('https://example.com');
    expect((screen.getByLabelText('Database') as HTMLInputElement).value).to.equal('poi');
    expect((screen.getByLabelText('Username') as HTMLInputElement).value).to.equal('shaw');
    expect((screen.getByLabelText('Password') as HTMLInputElement).value).to.equal('IMissYouR00t');
  });
  it('calls saveUrl on submit with new url', async () => {
    const saveUrlFake = sinon.fake();

    render(<ReplicationForm saveUrl={saveUrlFake} />, { wrapper: TestApp });
    (screen.getByLabelText('Hostname') as HTMLInputElement).value = 'https://example.com';
    (screen.getByLabelText('Database') as HTMLInputElement).value = 'poi';
    (screen.getByLabelText('Username') as HTMLInputElement).value = 'shaw';
    (screen.getByLabelText('Password') as HTMLInputElement).value = 'IMissYouR00t';
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(saveUrlFake.lastCall.firstArg).to.equal('https://shaw:IMissYouR00t@example.com/poi'));
  });
});
