import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"
import axios from "axios"

const MAX_RETRY_COUNT = 3
const RETRY_DELAY_MAX_MS = 30_000
const CACHE_STALE_TIME_MS = 5 * 60 * 1000
const CACHE_GC_TIME_MS = 30 * 60 * 1000

const isRetryableError = (error: unknown) => {
	if (!axios.isAxiosError(error)) {
		return true
	}

	const status = error.response?.status

	return status === undefined || status === 408 || status === 429 || status >= 500
}

const reportCacheError = (
	cache: "query" | "mutation",
	error: unknown,
	meta?: Record<string, unknown>,
) => {
	if (import.meta.env.DEV) {
		console.error(`[React Query] ${cache} failed`, { error, meta })
	}
}

export const queryCache = new QueryCache({
	onError: (error, query) => reportCacheError("query", error, query.meta),
})

export const mutationCache = new MutationCache({
	onError: (error, _variables, _context, mutation) =>
		reportCacheError("mutation", error, mutation.meta),
})

export const queryClient = new QueryClient({
	queryCache,
	mutationCache,
	defaultOptions: {
		queries: {
			staleTime: CACHE_STALE_TIME_MS,
			gcTime: CACHE_GC_TIME_MS,
			retry: (failureCount, error) =>
				failureCount < MAX_RETRY_COUNT && isRetryableError(error),
			retryDelay: (attemptIndex) =>
				Math.min(1_000 * 2 ** attemptIndex, RETRY_DELAY_MAX_MS),
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: false,
			refetchIntervalInBackground: false,
			networkMode: "offlineFirst",
			structuralSharing: true,
			throwOnError: false,
		},
		mutations: {
			gcTime: CACHE_GC_TIME_MS,
			retry: false,
			networkMode: "offlineFirst",
			throwOnError: false,
		},
	},
})
