import { Divider, IconButton, ListItemIcon, MenuItem, MenuList, SwipeableDrawer, Toolbar } from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import TagsIcon from '@material-ui/icons/LocalOffer';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { RoutePaths } from './Router';

const DrawerContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;
  line-height: 2;
`;

const StyledMenuList = styled(MenuList)`
  flex-grow: 1;
`;

type MenuDrawerProps = {
  title: React.ReactNode;
};

export default function MenuDrawer({ title }: MenuDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [location]);

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
            <MenuItem component={Link} to={RoutePaths.CATEGORIES}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <FormattedMessage id="label.categories" defaultMessage="Categories" description="Label for entry categories" />
            </MenuItem>
            <MenuItem component={Link} to={RoutePaths.TAGS}>
              <ListItemIcon>
                <TagsIcon />
              </ListItemIcon>
              <FormattedMessage id="label.tags" defaultMessage="Tags" description="Label for tags" />
            </MenuItem>
            <MenuItem component={Link} to={RoutePaths.SETTINGS}>
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
