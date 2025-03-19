// Usuario

export interface User {
  id?: string;
  uuid?: string;
  name: string;
  email: string;
  password: string;
  c_password: string;
  avatar?: null;
  address?: string | null;
  phone?: string | null;
  punctuation?: number | null;
  bulk_products?: null;
  bulk_offer?: null;
  role_id?: number;
  status?: number;
  rating?: number | null;
}
