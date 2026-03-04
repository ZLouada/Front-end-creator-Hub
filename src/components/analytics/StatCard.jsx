import React from 'react';

export default function StatCard({ label, value, helper, trend }) {
	return (
		<div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
			<p className="text-sm text-gray-500 mb-1">{label}</p>
			<div className="flex items-baseline gap-2">
				<span className="text-3xl font-bold text-gray-900">{value}</span>
				{trend && (
					<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
						trend > 0 ? 'text-green-700 bg-green-50 border border-green-100' : 'text-gray-600 bg-gray-100 border border-gray-200'
					}`}>
						{trend > 0 ? '+' : ''}{trend}%
					</span>
				)}
			</div>
			{helper && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
		</div>
	);
}
