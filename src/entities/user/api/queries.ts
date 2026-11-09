import { useQuery } from "@tanstack/react-query"

import { getMe } from "./queries.service"

export const useGetMe = () =>
	useQuery({
		queryFn: getMe,
		queryKey: ["me"],
	})
