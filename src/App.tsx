import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { TelegramHeader } from './components/TelegramHeader';
import { ShopNavbar } from './components/ShopNavbar';
import { QuickActionToolbar } from './components/QuickActionToolbar';
import { ProductGrid } from './components/ProductGrid';
import { BottomNav } from './components/BottomNav';
import { SideDrawer } from './components/SideDrawer';
import { SubViewsModal } from './components/SubViewsModal';
import { ProductModal } from './components/ProductModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { HomeDashboard } from './components/HomeDashboard';
import { OrdersView } from './components/OrdersView';
import { UsersView } from './components/UsersView';
import { ChatsView } from './components/ChatsView';
import { SettingsView } from './components/SettingsView';
import { CustomizationView } from './components/CustomizationView';
import { StorefrontView } from './components/StorefrontView';

const ShopApp: React.FC = () => {
  const {
    mode,
    activeTab,
    activeDrawerModal
  } = useShop();

  const [isMobileDeviceView, setIsMobileDeviceView] = useState(false);

  const isCustomizationActive = activeDrawerModal === 'customize';

  return (
    <div className={`min-h-screen bg-slate-900 flex justify-center selection:bg-[#5f2eea] selection:text-white`}>
      {/* Container: If isMobileDeviceView is true, render inside an authentic 430px smartphone shell */}
      <div
        className={`w-full bg-white min-h-screen flex flex-col shadow-2xl relative transition-all duration-300 ${
          isMobileDeviceView
            ? 'max-w-[430px] my-4 rounded-[40px] overflow-hidden border-[8px] border-slate-800 ring-1 ring-slate-700/50'
            : 'max-w-2xl'
        }`}
      >
        {/* Telegram Top WebApp Header */}
        <TelegramHeader
          isMobileDeviceView={isMobileDeviceView}
          setIsMobileDeviceView={setIsMobileDeviceView}
        />

        {/* Content Router */}
        <main className="flex-1 flex flex-col bg-slate-50 relative">
          {/* If Customization modal from SideDrawer is active */}
          {isCustomizationActive ? (
            <CustomizationView />
          ) : mode === 'storefront' ? (
            /* Buyer Storefront Mode */
            <StorefrontView />
          ) : (
            /* Shop Admin Manager Mode (Matches Screenshots) */
            <>
              {/* Header Navbar */}
              <ShopNavbar />

              {/* View according to Active Tab */}
              {activeTab === 'products' && (
                <>
                  <QuickActionToolbar />
                  <ProductGrid />
                </>
              )}

              {activeTab === 'home' && <HomeDashboard />}
              {activeTab === 'orders' && <OrdersView />}
              {activeTab === 'users' && <UsersView />}
              {activeTab === 'chats' && <ChatsView />}
              {activeTab === 'settings' && <SettingsView />}

              {/* Bottom Navigation Bar */}
              <BottomNav />
            </>
          )}
        </main>

        {/* Floating / Slide-out Modals */}
        <SideDrawer />
        <SubViewsModal />
        <ProductModal />
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <ShopApp />
    </ShopProvider>
  );
}
