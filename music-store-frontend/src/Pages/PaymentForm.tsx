import { useParams } from 'react-router-dom';
import { Order } from './Order';
import { useNavigate } from 'react-router-dom';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import '../musicStore.css';
import React, { useState, useEffect } from 'react';



const PaymentForm = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [fullPrice, setFullPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { orderId } = useParams();

  const handleToken = async (token: Token) => {
    console.log("fullPrice " + fullPrice);
    console.log("token " + token.id);
    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id, amount: fullPrice, orderId: orderId }),
      });

      if (response.ok) {
        console.log('Payment successful on the server side');
        navigate(`/successful-order`);
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
        await new Promise(resolve => setTimeout(resolve, 500));

        const response = await fetch(`/api/order/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }

        const orderData = await response.json();
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error.message);
      } finally {
        setLoading(false);
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
      setFullPrice(totalPrice * 100); // Adjust if needed
    }
  }, [order]);

  return (
    <div className="payment-form-container">
      <div className='payment-form-box'>
      {loading && <p>Loading...</p>}
      {!loading && order && (
        <StripeCheckout
          stripeKey="pk_test_51ObJ8dGilE1or8vMZDVTt2gozAi1rRrpr1C1AgksSbt720nmat7GpnViTquDg0CWLCBRIZCfXUzOfx366b9m8Jb000CD1zhhtc"
          token={handleToken}
          amount={fullPrice}
          currency="USD"
        />
      )}
      </div>
    </div>
  );
};

export default PaymentForm;
