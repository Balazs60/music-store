
import GuestCart from './GuestCart';
import UserCart from './UserCart';


/*interface CartItem {
  id: string;
  member: string;
  product: {
    id: string;
    name: string;
    color: string;
    price: number;
    brand: string;
    dtype: string;
    subCategoryId: string;
    numberOfStrings: number;
    numberOfSoundLayers: number;
    numberOfKeys: number;
    diameter: number;
    image: string;
  };
  quantity: number;
}*/

const Cart: React.FC = () => {

 const token = localStorage.getItem("token");

  return (
    <div className="app-container">
      {token ? <UserCart /> : <GuestCart />}
    </div>
  );
};


export default Cart;
