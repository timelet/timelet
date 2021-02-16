import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Entries from '../../views/Entries';
import Categories from '../../views/Categories';
import Settings from '../../views/Settings';
import Tags from '../../views/Tags';
import Dashboard from '../../views/Dashboard';

export const RoutePaths = {
  DASHBOARD: '/',
  ENTRIES: '/entries',
  CATEGORIES: '/categories',
  TAGS: '/tags',
  SETTINGS: '/settings'
};

export default function Router() {
  return (
    <Routes>
      <Route path={RoutePaths.DASHBOARD} element={<Dashboard />} />
      <Route path={RoutePaths.ENTRIES} element={<Entries />} />
      <Route path={RoutePaths.CATEGORIES} element={<Categories />} />
      <Route path={RoutePaths.TAGS} element={<Tags />} />
      <Route path={RoutePaths.SETTINGS} element={<Settings />} />
    </Routes>
  );
}
