import { fetchAPI } from './api';

export const paymentService = {
  createCheckoutSession: (tierId, gateway) => 
    fetchAPI('/payments/create-session', {
      method: 'POST',
      body: JSON.stringify({ tierId, gateway }),
    }),

  getSubscriptionStatus: (subscriptionId) => 
    fetchAPI(`/subscriptions/${subscriptionId}`, { method: 'GET' }),
};