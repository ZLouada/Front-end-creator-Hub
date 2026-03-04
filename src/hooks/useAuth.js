import { useCallback, useEffect, useState } from 'react';
import { authService } from '../services/api';

export const useAuth = () => {
	const [user, setUser] = useState(null);
	const [status, setStatus] = useState('idle');
	const [error, setError] = useState(null);

	useEffect(() => {
		const check = async () => {
			setStatus('loading');
			try {
				const session = await authService.checkSession();
				setUser(session?.user ?? null);
			} catch (err) {
				console.warn('Session check failed', err);
				setUser(null);
			} finally {
				setStatus('ready');
			}
		};

		check();
	}, []);

	const login = useCallback(async (email, password) => {
		setStatus('loading');
		setError(null);
		try {
			const res = await authService.login(email, password);
			const nextUser = res?.user ?? { email };
			setUser(nextUser);
			return nextUser;
		} catch (err) {
			setError(err?.message ?? 'Login failed');
			throw err;
		} finally {
			setStatus('ready');
		}
	}, []);

	const register = useCallback(async (displayName, email, password) => {
		setStatus('loading');
		setError(null);
		try {
			const res = await authService.register(displayName, email, password);
			const nextUser = res?.user ?? { displayName, email };
			setUser(nextUser);
			return nextUser;
		} catch (err) {
			setError(err?.message ?? 'Registration failed');
			throw err;
		} finally {
			setStatus('ready');
		}
	}, []);

	const logout = useCallback(() => {
		setUser(null);
	}, []);

	return { user, status, error, login, register, logout };
};
