
import { WantedProduct } from "./WantedProduct";

  

export interface Order {
    id: string;
    customerName: string;
    email: string;
    birthDate: string;
    phoneNumber: string;
    postCode: number;
    city: string;
    streetAndHouseNumber: string;
    wantedProducts: WantedProduct[];
    isPaid: boolean;
  }

  