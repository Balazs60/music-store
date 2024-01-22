import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentResult, setPaymentResult] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error(error.message);
        setPaymentResult(`Error: ${error.message}`);
      } else {
        // Send the paymentMethod to your backend for processing
        const response = await fetch('/api/payment/process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethodId: paymentMethod?.id, amount: 1000 }),
        });

        const result = await response.text();
        setPaymentResult(result);
      }
    } catch (error) {
      console.error('Error creating PaymentMethod:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </label>
        <button type="submit">Pay</button>
      </form>
      {paymentResult && <div>{paymentResult}</div>}
    </div>
  );
};

export default PaymentForm;
