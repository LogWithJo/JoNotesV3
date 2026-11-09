import { useGetMe } from "@entities/user/api/queries"

const HomePage = () => {
	const { data, isLoading, isError } = useGetMe()
	return (
		<div>
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error occurred while fetching user data.</p>}
			{data && (
				<div>
					<h1>Welcome, {data}!</h1>
				</div>
			)}
		</div>
	)
}

export default HomePage
