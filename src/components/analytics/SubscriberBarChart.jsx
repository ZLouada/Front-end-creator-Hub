import React from 'react';

const sampleSubscribers = [
	{ label: 'Week 1', value: 35 },
	{ label: 'Week 2', value: 48 },
	{ label: 'Week 3', value: 52 },
	{ label: 'Week 4', value: 68 },
];

export default function SubscriberBarChart({ data }) {
	const safeData = Array.isArray(data) && data.length ? data : sampleSubscribers;
	const maxValue = Math.max(...safeData.map((point) => Number(point.value) || 0), 1);

	return (
		<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h3 className="text-lg font-bold text-gray-900">Subscriber Growth</h3>
					<p className="text-sm text-gray-500">New paying users per week</p>
				</div>
			</div>

			<div className="flex items-end gap-3 h-48">
				{safeData.map((point) => {
					const height = Math.max((Number(point.value) || 0) / maxValue * 100, 6);
					return (
						<div key={point.label} className="flex-1 flex flex-col items-center gap-2">
							<div
								className="w-full rounded-lg bg-gradient-to-t from-purple-200 to-purple-500 shadow-sm"
								style={{ height: `${height}%`, minHeight: '14px' }}
							/>
							<div className="text-xs text-gray-500 text-center">{point.label}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
