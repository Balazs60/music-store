import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const PaymentForm: React.FC = () => {
  const handleToken = async (token: any) => {
    console.log("token " + token.id)
    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id, amount: 1000 }), 
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
        stripeKey="pk_test_51ObJ8dGilE1or8vMZDVTt2gozAi1rRrpr1C1AgksSbt720nmat7GpnViTquDg0CWLCBRIZCfXUzOfx366b9m8Jb000CD1zhhtc"
        token={handleToken}
        amount={1000} // Amount in cents
        currency="USD"
      >
        <button>Pay</button>
      </StripeCheckout>
    </div>
  );
};

export default PaymentForm;
