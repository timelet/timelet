import { Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

type ConfirmDialogProps = React.PropsWithChildren<{
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
}>;

export default function ConfirmDialog({ title, description, onConfirm, children }: ConfirmDialogProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const catchBubblingEvents = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
    toggleOpen();
  };

  const handleCancel = () => {
    toggleOpen();
  };

  const handleConfirm = () => {
    toggleOpen();
    onConfirm();
  };

  return (
    <>
      <div onClick={catchBubblingEvents} onKeyPress={catchBubblingEvents} role="presentation">
        {children}
      </div>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCancel}>
            <FormattedMessage id="action.cancel" defaultMessage="Cancel" />
          </Button>
          <Button color="primary" onClick={handleConfirm}>
            <FormattedMessage id="action.confirm" defaultMessage="Confirm" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
