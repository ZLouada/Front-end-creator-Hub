import { fetchAPI } from './api';

export const analyticsService = {
  getMetrics: () => 
    fetchAPI('/analytics/metrics', { method: 'GET' }),

  getRevenueData: () => 
    fetchAPI('/analytics/revenue-chart', { method: 'GET' }),

  getSubscriberData: () => 
    fetchAPI('/analytics/subscriber-chart', { method: 'GET' }),
};