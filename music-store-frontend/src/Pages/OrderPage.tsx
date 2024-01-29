import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from './Order';
import { WantedProduct } from './WantedProduct';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();

  const navigate = useNavigate();
  function handleNavigatToPay(){
    if(order){
               navigate(`/payment/${order.id}`);
    }
    
  }


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: Record<string, string> = token
          ? { Authorization: `Bearer ${token}` }
          : {};
  
        const response = await fetch(`/api/order/${orderId}`,
        { method: 'GET', headers: headers }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }

        const orderData = await response.json();
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Error loading order</p>;
  }



  return (
    <div>
      <h2>Order Page</h2>
      <p>ID: {order.id}</p>
      <p>Customer Name: {order.customerName}</p>
      <p>Email: {order.email}</p>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Price Per Piece</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.wantedProducts.map((wantedProduct: WantedProduct) => (
            <tr key={wantedProduct.id}>
              <td>{wantedProduct.productId}</td>
              <td>{wantedProduct.produtPriceByPiece}</td>
              <td>{wantedProduct.productQuantity}</td>
              <td>{wantedProduct.productQuantity * wantedProduct.produtPriceByPiece}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleNavigatToPay}>Navigate to Payment</button>
      
    </div>
  );
};

export default OrderPage;
