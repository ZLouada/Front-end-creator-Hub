import { useState } from 'react';
import { paymentService } from '../services/paymentService';

export const useCheckout = (tierId) => {
  const [selectedGateway, setSelectedGateway] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const sessionData = await paymentService.createCheckoutSession(tierId, selectedGateway);

      if (sessionData && sessionData.checkoutUrl) {
        window.location.href = sessionData.checkoutUrl; 
      } else {
        throw new Error('لم يتم استلام رابط الدفع من الخادم.');
      }
    } catch (err) {
      setError(err.message || 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  return { selectedGateway, setSelectedGateway, isProcessing, error, handlePaymentSubmit };
};