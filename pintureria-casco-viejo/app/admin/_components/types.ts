export type TabKey = 'productos' | 'ventas' | 'usuarios';

export interface Category {
  id: string;
  name: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface SaleRecord {
  id: string;
  date: string;
  amount: number;
}
