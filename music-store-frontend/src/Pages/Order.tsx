
import { Product } from "./Products";
  

export interface Order {
    id: string;
    customerName: string;
    email: string;
    birthDate: string;
    phoneNumber: string;
    postCode: number;
    city: string;
    streetAndHouseNumber: string;
    products: Product[];
    isPaid: boolean;
  }

  