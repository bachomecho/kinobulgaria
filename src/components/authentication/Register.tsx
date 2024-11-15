import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo from "/assets/static/logo/logo_kino.png";
import { authContext } from "../../App";
import { ArrowLeft } from "lucide-react";

function Register() {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isUserNameAvailable, setIsUserNameAvailable] = useState(true);
	const [errorState, setErrorState] = useState<
		"username" | "password" | "confirmPassword" | null
	>(null);
	const navigate = useNavigate();
	const { userUuid, setUserUuid } = useContext(authContext);

	useEffect(() => {
		if (userUuid) {
			const timer = setTimeout(() => {
				navigate("/");
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, []);

	useEffect(() => {
		if (confirmPassword !== password) {
			setErrorState("confirmPassword");
		} else {
			setErrorState(null);
		}
	}, [confirmPassword]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const credentials = new URLSearchParams({ username, password });

		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: credentials.toString(),
			});

			if (!response.ok) {
				throw new Error("Registration failed.");
			}

			const status = await response.json();
			if (status.successfulRegistration) {
				setUserUuid(status.userUuid);
				localStorage.setItem("userUuid", status.userUuid);
				navigate("/");
			} else {
				setIsUserNameAvailable(false);
			}
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	return (
		<>
			{!userUuid ? (
				<>
					<Button
						variant="outlined"
						className="absolute top-7 left-7 mb-4 flex space-x-2 bg-gray-100"
						aria-label="Return to home page"
						href="/"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>Return to Home</span>
					</Button>
					<div
						className="min-h-screen flex items-center justify-center bg-gray-100"
						style={{ margin: 0, padding: 0 }}
					>
						<div className="w-full max-w-sm p-6 bg-blue rounded-lg shadow-md">
							<div className="flex justify-center mb-6">
								<img src={logo} alt="Logo" className="h-12 w-12" />
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
									{!isUserNameAvailable ? (
										<TextField
											error
											name="username"
											label="Username"
											id="username-error-helper-text"
											size="small"
											variant="outlined"
											helperText="This user name is already taken."
											onChange={(e) => setUserName(e.target.value)}
										/>
									) : (
										<TextField
											name="username"
											label="Username"
											size="small"
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
											type="password"
											size="small"
											id="password-error-helper-text"
											variant="outlined"
											helperText="Incorrect password. Please try again."
											onChange={(e) => setPassword(e.target.value)}
										/>
									) : (
										<TextField
											name="password"
											label="Password"
											type="password"
											size="small"
											id="password-helper-text"
											variant="outlined"
											onChange={(e) => setPassword(e.target.value)}
										/>
									)}
								</div>
								<div className="mb-4">
									{errorState == "confirmPassword" ? (
										<TextField
											error
											name="confirm-password"
											label="ConfirmPassword"
											type="password"
											size="small"
											id="confirm-password-error-helper-text"
											variant="outlined"
											helperText="Passwords do not match."
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									) : (
										<TextField
											name="confirm-password"
											label="ConfirmPassword"
											type="password"
											size="small"
											id="confirm-password-error-helper-text"
											variant="outlined"
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									)}
								</div>
								{!errorState ? (
									<Button
										variant="contained"
										name="submit"
										type="submit"
										className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									>
										Регистрация
									</Button>
								) : (
									<Button
										variant="contained"
										name="submit"
										type="submit"
										className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
										disabled
									>
										Регистрация
									</Button>
								)}
							</Box>
						</div>
					</div>
				</>
			) : (
				<p>You are already registered. You will be redirected to home.</p>
			)}
		</>
	);
}

export default Register;
