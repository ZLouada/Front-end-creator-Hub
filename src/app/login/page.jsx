'use client';

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
	const { user, status, error, login, register, logout } = useAuth();
	const [mode, setMode] = useState('login');
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (mode === 'login') {
				await login(email, password);
			} else {
				await register(displayName, email, password);
			}
		} catch (err) {
		}
	};

	if (user) {
		return (
			<div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
				<h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
				<p className="text-gray-600">Signed in as {user.displayName || user.email}</p>
				<button
					onClick={logout}
					className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
				>
					Sign out
				</button>
			</div>
		);
	}

	return (
		<div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-bold text-gray-900">{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
				<button
					onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
					className="text-sm text-blue-600 hover:underline"
				>
					{mode === 'login' ? 'Need an account?' : 'Have an account?'}
				</button>
			</div>

			<form className="space-y-4" onSubmit={handleSubmit}>
				{mode === 'register' && (
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Display name</label>
						<input
							type="text"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
							required
						/>
					</div>
				)}

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
						required
					/>
				</div>

				{error && <p className="text-sm text-red-600">{error}</p>}

				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
					disabled={status === 'loading'}
				>
					{status === 'loading' ? 'Processing...' : mode === 'login' ? 'Sign in' : 'Create account'}
				</button>
			</form>
		</div>
	);
}
