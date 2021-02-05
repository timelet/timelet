import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

export default function SharedSettingsForm() {
  return (
    <form>
      <FormControl fullWidth>
        <InputLabel>
          <FormattedMessage id="label.profile" defaultMessage="Profile" />
        </InputLabel>
        <Select name="profile">
          <MenuItem value="default">
            <FormattedMessage id="label.default" defaultMessage="Default" />
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>
          <FormattedMessage id="label.language" defaultMessage="Language" />
        </InputLabel>
        <Select name="language" displayEmpty />
      </FormControl>
    </form>
  );
}
