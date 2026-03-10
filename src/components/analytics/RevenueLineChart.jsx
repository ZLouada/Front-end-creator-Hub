import React from 'react';

const sampleRevenue = [
	{ label: 'Jan', value: 1200 },
	{ label: 'Feb', value: 1600 },
	{ label: 'Mar', value: 1800 },
	{ label: 'Apr', value: 2200 },
	{ label: 'May', value: 2600 },
	{ label: 'Jun', value: 3000 },
];

export default function RevenueLineChart({ data }) {
	const safeData = Array.isArray(data) && data.length ? data : sampleRevenue;
	const maxValue = Math.max(...safeData.map((point) => Number(point.value) || 0), 1);

	return (
		<div className="bg-surface-card p-6 rounded-2xl shadow-soft border border-editorial-border">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h3 className="text-lg font-bold text-brand-900">Revenue</h3>
					<p className="text-sm text-gray-500">Monthly recurring revenue trend</p>
				</div>
				<span className="text-xs text-success bg-green-50 border border-green-100 px-2 py-1 rounded-full">Live</span>
			</div>

			<div className="flex items-end gap-3 h-48">
				{safeData.map((point) => {
					const height = Math.max((Number(point.value) || 0) / maxValue * 100, 4);
					return (
						<div key={point.label} className="flex-1 flex flex-col items-center gap-2">
							<div
								className="w-full rounded-lg bg-gradient-to-t from-gray-300 to-gray-500 shadow-soft-sm"
								style={{ height: `${height}%`, minHeight: '12px' }}
							/>
							<div className="text-xs text-gray-500">{point.label}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
