import React from 'react';

const gatewayOptions = [
	{
		id: 'stripe',
		label: 'Card (Stripe)',
		description: 'Pay with Visa, Mastercard, or Amex.',
		badge: 'Recommended',
	},
	{
		id: 'paypal',
		label: 'PayPal',
		description: 'Use your PayPal balance or linked bank.',
	},
	{
		id: 'razorpay',
		label: 'Razorpay',
		description: 'UPI, net banking, and local wallets.',
	},
];

export default function PaymentMethods({ selectedGateway, setSelectedGateway }) {
	const handleSelect = (gatewayId) => {
		if (typeof setSelectedGateway === 'function') {
			setSelectedGateway(gatewayId);
		}
	};

	return (
		<div className="mb-6 space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
				<span className="text-xs text-gray-500">Secure and encrypted</span>
			</div>

			<div className="grid gap-3">
				{gatewayOptions.map((gateway) => {
					const isSelected = selectedGateway === gateway.id;
					return (
						<button
							key={gateway.id}
							type="button"
							onClick={() => handleSelect(gateway.id)}
							className={`w-full text-left border rounded-xl p-4 transition-colors shadow-soft bg-surface-card hover:border-editorial-border hover:shadow-soft-md ${
								isSelected ? 'border-brand-900 ring-1 ring-gray-300' : 'border-editorial-border'
							}`}
						>
							<div className="flex items-start gap-3">
								<div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
									isSelected ? 'bg-brand-900 text-white' : 'bg-gray-100 text-gray-700'
								}`}>
									{gateway.label[0]}
								</div>
								<div className="flex-1">
									<div className="flex items-center gap-2">
										<span className="font-semibold text-gray-900">{gateway.label}</span>
										{gateway.badge && (
											<span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wide">
												{gateway.badge}
											</span>
										)}
									</div>
									<p className="text-sm text-gray-600 mt-1">{gateway.description}</p>
								</div>
								<input
									type="radio"
									readOnly
									checked={isSelected}
									className="mt-1 h-4 w-4 text-brand-900 border-editorial-border focus:ring-gray-400"
								/>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
