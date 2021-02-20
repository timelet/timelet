import { Divider, IconButton, ListItemIcon, MenuItem, MenuList, SwipeableDrawer, Toolbar } from '@material-ui/core';
import React from 'react';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  LocalOffer as TagsIcon,
  PlaylistPlay as EntryIcon,
  Poll as ReportIcon,
  GitHub as GitHubIcon,
  Language as WebsiteIcon
} from '@material-ui/icons';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { RoutePaths } from './Router';

const DrawerContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15rem;

  a {
    line-height: 2;
  }
`;

const StyledMenuList = styled(MenuList)`
  flex-grow: 1;
`;

const BottomToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
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
            <li>
              <MenuItem component={Link} to={RoutePaths.ENTRIES}>
                <ListItemIcon>
                  <EntryIcon />
                </ListItemIcon>
                <FormattedMessage id="label.entries" defaultMessage="Entries" />
              </MenuItem>
            </li>
            <li>
              <MenuItem component={Link} to={RoutePaths.REPORT}>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <FormattedMessage id="title.report" defaultMessage="Report" />
              </MenuItem>
            </li>
            <li>
              <MenuItem component={Link} to={RoutePaths.CATEGORIES}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <FormattedMessage id="label.categories" defaultMessage="Categories" description="Label for entry categories" />
              </MenuItem>
            </li>
            <li>
              <MenuItem component={Link} to={RoutePaths.TAGS}>
                <ListItemIcon>
                  <TagsIcon />
                </ListItemIcon>
                <FormattedMessage id="label.tags" defaultMessage="Tags" description="Label for tags" />
              </MenuItem>
            </li>
            <li>
              <MenuItem component={Link} to={RoutePaths.SETTINGS}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <FormattedMessage id="label.settings" defaultMessage="Settings" description="Label for system settings" />
              </MenuItem>
            </li>
          </StyledMenuList>
          <Divider />
          <BottomToolbar>
            <FormattedMessage
              id="version"
              defaultMessage="Version {version}"
              values={{ version: import.meta.env.SNOWPACK_PUBLIC_PACKAGE_VERSION }}
              description="Display the the current version"
            />
            <IconButton href="https://timelet.org" target="blank">
              <WebsiteIcon />
            </IconButton>
            <IconButton href="https://github.com/timelet/timelet" target="blank">
              <GitHubIcon />
            </IconButton>
          </BottomToolbar>
        </DrawerContainer>
      </SwipeableDrawer>
    </>
  );
}
