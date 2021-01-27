import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Entries from '../../views/Entries';
import Categories from '../../views/Categories';
import Settings from '../../views/Settings';

export const RoutePaths = {
  DASHBOARD: '/',
  CATEGORIES: '/categories',
  SETTINGS: '/settings'
};

export default function Router() {
  return (
    <Routes>
      <Route path={RoutePaths.DASHBOARD} element={<Entries />} />
      <Route path={RoutePaths.CATEGORIES} element={<Categories />} />
      <Route path={RoutePaths.SETTINGS} element={<Settings />} />
    </Routes>
  );
}
