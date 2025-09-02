import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatSupport from './ChatSupport';
import BottomNavigation from './BottomNavigation';

export default function Layout() {
  return (
    <div className="h-screen overflow-x-hidden pb-14">
      <Outlet />
      <ChatSupport />
      <BottomNavigation />
    </div>
  );
}