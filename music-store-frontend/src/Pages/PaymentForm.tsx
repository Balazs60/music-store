import StripeCheckout from 'react-stripe-checkout';
import { useParams } from 'react-router-dom';
import { Order } from './Order';
import { useState, useEffect } from 'react';

const PaymentForm = () => {

  const [order, setOrder] = useState<Order | null>(null);
const [fullPrice, setFullPrice] = useState(0);

  const { orderId } = useParams();

  const handleToken = async (token: {id: string, amount:number}) => {
    console.log("fullPrice " + fullPrice)
    console.log("token " + token.id)
    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id, amount: fullPrice , orderId:orderId }), 
      });

      if (response.ok) {
        console.log('Payment successful on the server side');
      } else {
        console.error('Payment failed on the server side');
      }
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }

        const orderData = await response.json();
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:');
      } 
    };

    fetchOrder();
  }, [orderId]);


  useEffect(() => {
    if (order) {
      let totalPrice = 0;
      for (const wantedProduct of order.wantedProducts) {
        totalPrice += wantedProduct.produtPriceByPiece * wantedProduct.productQuantity;
      }
      totalPrice *= 100
      setFullPrice(totalPrice);
    }
  }, [order]); 
  return (
    <div>
      <StripeCheckout
       const  stripeKey="pk_test_51ObJ8dGilE1or8vMZDVTt2gozAi1rRrpr1C1AgksSbt720nmat7GpnViTquDg0CWLCBRIZCfXUzOfx366b9m8Jb000CD1zhhtc"
        token={handleToken}
        amount={fullPrice} 
        orderId={orderId}
        currency="USD"
      >
        <button>Payyyyy</button>
      </StripeCheckout>
    </div>
  );
};

export default PaymentForm;
