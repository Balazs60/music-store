
import GuestCart from './GuestCart';


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


  return (
    <div className="app-container">
       <GuestCart />
    </div>
  );
};


export default Cart;
