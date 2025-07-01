import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function getLocalStorageData<T>(key: string) {
	if (typeof localStorage === 'undefined') throw new Error('Local storage is not available');

	const value = localStorage.getItem(key);

	return value ? (JSON.parse(value) as T) : null;
}

export function setLocalStorageData<T>(key: string, value: T) {
	if (typeof window === 'undefined') {
		return null;
	}
	// if (typeof localStorage === 'undefined') throw new Error('Local storage is not available');

	localStorage.setItem(key, JSON.stringify(value));
}
