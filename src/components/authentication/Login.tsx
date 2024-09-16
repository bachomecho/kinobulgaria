import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Login() {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [errorState, setErrorState] = useState<
		"username" | "password" | null
	>();
	const navigate = useNavigate();

	useEffect(() => {
		setErrorState(null);
	}, [username, password]);

	type TResponseData = {
		credentials: { username: string | boolean; password: string | boolean };
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const credentials = new URLSearchParams({ username, password });

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: credentials.toString(),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			const data: TResponseData = await response.json();
			if (typeof data.credentials.username !== "string") {
				setErrorState("username");
				return;
			}
			if (typeof data.credentials.password !== "string") {
				setErrorState("password");
				return;
			}
			navigate("/");
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
				<div className="flex justify-center mb-6">
					<img src="/logo/logo_kino.jpg" alt="Logo" className="h-12 w-12" />
				</div>

				<Box
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
					onSubmit={handleSubmit}
				>
					<div className="mb-4">
						{errorState == "username" ? (
							<TextField
								error
								name="username"
								label="Username"
								id="username-error-helper-text"
								variant="outlined"
								helperText="User does not exist."
								onChange={(e) => setUserName(e.target.value)}
							/>
						) : (
							<TextField
								name="username"
								label="Username"
								id="username-helper-text"
								variant="outlined"
								onChange={(e) => setUserName(e.target.value)}
							/>
						)}
					</div>
					<div className="mb-4">
						{errorState == "password" ? (
							<TextField
								error
								name="password"
								label="Password"
								id="password-error-helper-text"
								variant="outlined"
								helperText="Incorrect password. Please try again."
								onChange={(e) => setPassword(e.target.value)}
							/>
						) : (
							<TextField
								name="password"
								label="Password"
								id="password-helper-text"
								variant="outlined"
								onChange={(e) => setPassword(e.target.value)}
							/>
						)}
					</div>
					<Button
						variant="contained"
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Вход
					</Button>
				</Box>
			</div>
		</div>
	);
}
