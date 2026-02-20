'use client';

import Logo from '../ui/logo';
import { FaUserCircle } from 'react-icons/fa';
import { CiLogout, CiMenuFries } from 'react-icons/ci';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useTabStore } from '@/store/tab';
import ChangeCredentials from '../ui/change-credentials';
import Orders from '../ui/orders';
import Products from '../ui/products';
import AddProduct from '../ui/add-product';
import OrderDetails from '../ui/order-details';
import EditProduct from '../ui/edit-product';

const AdminDashboard = () => {
  const { activeTab, setActiveTab, selectedProductId } = useTabStore();

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      // Redirect to login page after logout
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <div className="w-full bg-fixed bg-white shadow-2xs py-4 flex items-center justify-between px-4">
        <Logo />

        {/* Tabs – Desktop */}
        <div className="hidden md:flex border rounded-md overflow-hidden">
          {['Manage Orders', 'Manage Products', 'Add Product'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 transition ${tab === activeTab
                ? 'bg-black text-white'
                : 'bg-gray-50 hover:bg-gray-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-3">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer">
                  <CiMenuFries size={25} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-[200px]" align="end">
                {/* Tabs – Mobile */}
                <div className="md:hidden">
                  {['Manage Orders', 'Manage Products', 'Add Product'].map(tab => (
                    <DropdownMenuItem
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer ${tab === activeTab ? 'font-semibold' : ''
                        }`}
                    >
                      {tab}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </div>

                <DropdownMenuGroup>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      Change Credentials
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => logout()} className="flex items-center gap-2 text-red-600">
                  <CiLogout size={22} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ChangeCredentials />
          </Dialog>

          {/* Hide avatar on very small screens if needed */}
          <FaUserCircle size={40} className="hidden sm:block" />
        </div>
      </div>


      {/* Body */}
      <div className="px-4 py-6 overflow-y-scroll w-full">
        {activeTab === 'Manage Orders' && <Orders />}
        {activeTab === 'Manage Products' && <Products />}
        {activeTab === 'Add Product' && <AddProduct />}
        {activeTab === 'Order Details' && <OrderDetails />}
        {activeTab === 'Edit Product' && <EditProduct productId={selectedProductId} onUpdated={() => setActiveTab('Manage Products')} />}
      </div>

    </div>
  );
};

export default AdminDashboard;
