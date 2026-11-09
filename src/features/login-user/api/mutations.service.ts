import { apiClient } from "@shared/index"

export async function ContinueLogin(email: string, password: string) {
	const response = await apiClient.post("/auth/continue", { email, password })
	return response
}
