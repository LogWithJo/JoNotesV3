import { apiClient } from "@/shared/index"

export async function getMe() {
	const response = await apiClient.get("/auth/me")
	return response
}
