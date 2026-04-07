import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
