import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useParams } from 'react-router-dom';
const PaymentForm: React.FC = () => {
  const { orderId } = useParams();
  console.log(orderId+" orderid")
  const handleToken = async (token: any) => {
    console.log("token " + token.id)
    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id, amount: 1000 , orderId:orderId }), 
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

  return (
    <div>
      <StripeCheckout
       const  stripeKey="pk_test_51OaEV6CrCBDEIb4OSm45sChsKsWqyHBSp4QFSIGuE3jln2zhlBPo6qfsnnBrBjKr511gp4YWgpmjUgPq7yWTBOm1001deX3C2G"
        token={handleToken}
        amount={1000} 
        orderId={orderId}
        currency="USD"
      >
        <button>Pay</button>
      </StripeCheckout>
    </div>
  );
};

export default PaymentForm;
