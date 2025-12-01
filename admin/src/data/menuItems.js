import { Home, Users, ShoppingCart, Calendar, User, Grid } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  // { icon: Users, label: 'AI Assistant', badge: 'NEW', path: '/ai-assistant' },
  {
    icon: ShoppingCart,
    label: 'E-commerce',
    badge: 'NEW',
    submenu: [
      { label: 'Products', path: '/products' },
      { label: 'Add Product', path: '/add-product' },
      // { label: 'Billing', path: '/billing' },
      // { label: 'Invoices', path: '/invoices' },
      // { label: 'Single Invoice', path: '/single-invoice' },
      // { label: 'Create Invoice', path: '/create-invoice' },
      // { label: 'Transactions', path: '/transactions' },
      // { label: 'Single Transaction', path: '/single-transaction' },
    ],
  },
  // { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: User, label: 'User Profile', path: '/profile' },
  // { icon: Grid, label: 'Task', path: '/task' },
];

export default menuItems;