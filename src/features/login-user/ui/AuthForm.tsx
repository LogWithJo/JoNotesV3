import { useState } from "react"

import { useContinue } from "../api/mutations"

function AuthForm() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { mutate } = useContinue()
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		mutate(
			{ email, password },
			{
				onSuccess: () => {
					;(setEmail(""), setPassword(""))
				},
			},
		)
	}
	return (
		<div>
			<form action="">
				<input
					type="email"
					name="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					name="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" onSubmit={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	)
}

export default AuthForm
