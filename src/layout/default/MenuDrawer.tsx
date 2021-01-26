import { Divider, IconButton, ListItemIcon, MenuItem, MenuList, SwipeableDrawer, Toolbar } from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

const DrawerContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;
`;

const StyledMenuList = styled(MenuList)`
  flex-grow: 1;
`;

type MenuDrawerProps = {
  title: React.ReactNode;
};

export default function MenuDrawer({ title }: MenuDrawerProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer open={open} onClose={toggleDrawer} onOpen={toggleDrawer}>
        <DrawerContainer>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close menu" onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
            {title}
          </Toolbar>
          <Divider />
          <StyledMenuList>
            <MenuItem>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <FormattedMessage id="label.categories" defaultMessage="Categories" description="Label for entry categories" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <FormattedMessage id="label.settings" defaultMessage="Settings" description="Label for system settings" />
            </MenuItem>
          </StyledMenuList>
          <Divider />
          <Toolbar>
            <FormattedMessage
              id="version"
              defaultMessage="Version {version}"
              values={{ version: import.meta.env.SNOWPACK_PUBLIC_PACKAGE_VERSION }}
              description="Display the the current version"
            />
          </Toolbar>
        </DrawerContainer>
      </SwipeableDrawer>
    </>
  );
}
