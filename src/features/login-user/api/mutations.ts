import { useMutation, useQueryClient } from "@tanstack/react-query"

import { ContinueLogin } from "./mutations.service"

export const useContinue = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			ContinueLogin(email, password),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "me"] })
		},
	})
}
