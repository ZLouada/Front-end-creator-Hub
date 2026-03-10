import React from 'react';

export default function OrderSummary({ planName = 'Pro Tier Subscription', product = 'Creative Studio', price = 10.0 }) {
	return (
		<div className="bg-surface w-full p-6 rounded-2xl border border-editorial-border">
			<h2 className="text-lg font-bold text-brand-900 mb-4">Order Summary</h2>
			<div className="flex items-center gap-3 mb-4">
				<div className="w-10 h-10 bg-info-100 text-info rounded-full flex items-center justify-center font-bold">
					{product[0]}
				</div>
				<div>
					<p className="font-semibold text-brand-900">{product}</p>
					<p className="text-sm text-gray-500">{planName}</p>
				</div>
			</div>
			<div className="border-t border-editorial-border pt-4 flex items-center justify-between">
				<span className="text-gray-700 font-medium">Total due today</span>
				<span className="text-xl font-bold text-brand-900">${price.toFixed(2)}</span>
			</div>
		</div>
	);
}
