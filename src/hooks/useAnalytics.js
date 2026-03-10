import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';

const sampleMetrics = { mrr: 3200, totalSubscribers: 184, successRate: 97 };
const sampleRevenue = [
	{ label: 'Jan', value: 1200 },
	{ label: 'Feb', value: 1450 },
	{ label: 'Mar', value: 1600 },
	{ label: 'Apr', value: 2100 },
	{ label: 'May', value: 2600 },
	{ label: 'Jun', value: 3050 },
];
const sampleSubscribers = [
	{ label: 'Week 1', value: 35 },
	{ label: 'Week 2', value: 48 },
	{ label: 'Week 3', value: 52 },
	{ label: 'Week 4', value: 68 },
];

export const useAnalytics = () => {
	const [metrics, setMetrics] = useState(sampleMetrics);
	const [revenueData, setRevenueData] = useState(sampleRevenue);
	const [subscriberData, setSubscriberData] = useState(sampleSubscribers);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [metricsRes, revRes, subRes] = await Promise.all([
					analyticsService.getMetrics(),
					analyticsService.getRevenueData(),
					analyticsService.getSubscriberData(),
				]);

				if (metricsRes) setMetrics(metricsRes);
				if (revRes?.data?.length) setRevenueData(revRes.data);
				if (subRes?.data?.length) setSubscriberData(subRes.data);
			} catch (err) {
				console.warn('Analytics fallback data being used', err);
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { metrics, revenueData, subscriberData, isLoading, error };
};
