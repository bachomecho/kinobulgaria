import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Video, Trash2 } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	Avatar,
	TextField,
} from "@mui/material";
import Header from "../Header";
import defaultUser from "/assets/static/icons/default_user.svg";
import { removeMovieWatchlist } from "../../App";
import { TWatchlist, IApiUserData } from "../../types/types";

function UserSettings() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [oldPasswordError, setOldPasswordError] = useState("");
	const [watchlist, setWatchlist] = useState<TWatchlist[]>([]);
	const [userData, setUserData] = useState({
		username: "",
		registrationDate: new Date(),
	});
	const userUuid = localStorage.getItem("userUuid") || null;
	const navigate = useNavigate();

	const buttonSx = {
		color: "black",
		backgroundColor: "#FFD700",
		"&:hover": {
			backgroundColor: "#f5d31b",
			borderColor: "black",
		},
		borderColor: "black",
	};

	const textFieldSx = {
		"& .MuiOutlinedInput-root": {
			"&:hover fieldset": {
				borderColor: "#FFD700",
			},
			"&.Mui-focused fieldset": {
				borderColor: "#FFD700",
			},
		},
		"& .MuiInputLabel-root.Mui-focused": {
			color: "#FFD700",
		},
	};

	useEffect(() => {
		fetch(`/api/userdata/${userUuid}`, {
			method: "GET",
		})
			.then((res) => {
				if (!res.ok) {
					const timer = setTimeout(() => {
						navigate("/");
					}, 200);
					localStorage.removeItem("userUuid");

					return () => clearTimeout(timer);
				}
				return res.json();
			})
			.then((data: IApiUserData) => {
				if (data.watchlist)
					setWatchlist(JSON.parse(data.watchlist.split("|").join(",")));
				setUserData({
					username: data.username,
					registrationDate: new Date(data.registrationDate),
				});
			})
			.catch((error) => {
				console.error(
					"Following error occurred while fetching watchlist data:",
					error
				);
			});
	}, []);

	const handlePasswordChange = async (e: React.FormEvent) => {
		// TODO: potentially throttle change password requests: 3 hourly max
		e.preventDefault();
		try {
			const response = await fetch(`/auth/change-password/${userUuid}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					oldPassword: oldPassword,
					newPassword: newPassword,
				}).toString(),
			});

			if (!response.ok) {
				throw new Error("Password change cannot be requested.");
			}

			const res = await response.json();
			if (!res.oldPasswordCorrect) {
				setOldPasswordError("Old password is not correct.");
			} else {
				// TODO: snack bar to show password change was successful
				window.alert("Password was changed successfully.");
			}
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	return (
		<>
			{!userUuid ? (
				<div>
					<p>
						Моля влезте в акаунта си за да имате достъп до настройките. Ще
						бъдете препратени към началото на сайта.
					</p>
				</div>
			) : (
				<>
					<Header showSearch={false} />
					<div className="container mx-auto p-4 space-y-8">
						<Card>
							<CardHeader>
								<h2>User Settings</h2>
								<p>Manage your account settings and preferences.</p>
							</CardHeader>
							<CardContent className="space-y-8">
								<div className="flex items-center space-x-4">
									<Avatar className="w-20 h-20">
										<img src={defaultUser} alt={"username"} />
									</Avatar>
									<div>
										<h2 className="text-2xl font-bold">{userData.username}</h2>
										<p className="text-muted-foreground">
											гледа от{" "}
											{`${userData.registrationDate.toLocaleString("bg", {
												month: "long",
											})} ${userData.registrationDate.getFullYear()}`}
										</p>
									</div>
								</div>

								<div className="space-y-4">
									<h3 className="text-lg font-semibold">Парола</h3>
									{!isChangingPassword ? (
										<Button
											onClick={() => setIsChangingPassword(true)}
											variant="contained"
											type="submit"
											sx={buttonSx}
										>
											Смени паролата
										</Button>
									) : (
										<form onSubmit={handlePasswordChange} className="space-y-4">
											{!oldPasswordError ? (
												<div className="space-y-2">
													<h3>Стара парола</h3>
													<TextField
														id="old-password"
														type="password"
														size="small"
														sx={textFieldSx}
														value={oldPassword}
														onChange={(e) => setOldPassword(e.target.value)}
														required
													/>
												</div>
											) : (
												<div className="space-y-2">
													<h3>Стара парола</h3>
													<TextField
														id="old-password"
														error
														type="password"
														size="small"
														value={oldPassword}
														onChange={(e) => setOldPassword(e.target.value)}
														required
														aria-errormessage={oldPasswordError}
													/>
												</div>
											)}
											<div className="space-y-2">
												<h3>Нова парола</h3>
												<TextField
													id="new-password"
													type="password"
													size="small"
													sx={textFieldSx}
													value={newPassword}
													onChange={(e) => setNewPassword(e.target.value)}
													required
												/>
											</div>
											<div className="space-y-2">
												<h3>Потвърди новата парола</h3>
												{confirmPassword !== newPassword ? (
													<TextField
														error
														type="password"
														size="small"
														name="confirm-password"
														id="confirm-password-error-helper-text"
														variant="outlined"
														color="error"
														onChange={(e) => setConfirmPassword(e.target.value)}
													/>
												) : (
													<TextField
														name="confirm-password"
														type="password"
														size="small"
														sx={textFieldSx}
														id="confirm-password-helper-text"
														variant="outlined"
														onChange={(e) => setConfirmPassword(e.target.value)}
													/>
												)}
											</div>
											<div className="space-x-2">
												{confirmPassword !== newPassword ? (
													<Button
														type="submit"
														variant="contained"
														className="reg-btn"
														sx={buttonSx}
														disabled
													>
														Запази новата парола
													</Button>
												) : (
													<Button
														type="submit"
														variant="contained"
														sx={buttonSx}
													>
														Запази новата парола
													</Button>
												)}
												<Button
													type="button"
													sx={buttonSx}
													onClick={() => setIsChangingPassword(false)}
												>
													Затвори
												</Button>
											</div>
										</form>
									)}
								</div>
								<h3 className="text-lg font-semibold">Гледай по-късно</h3>
								<div className="w-full max-w-md">
									<ul className="space-y-4">
										{watchlist.map((item, index) => (
											<li
												key={index}
												className="flex items-center space-x-4 bg-card p-4 rounded-lg shadow"
											>
												<img
													src={`/images/${item.thumbnail_name}.jpg`}
													alt={item.title}
													width={50}
													height={50}
													className="rounded-md"
												/>
												<div className="flex-grow">
													<h3 className="font-semibold">{item.title}</h3>
													<p className="text-sm text-muted-foreground">
														{item.release_year}
													</p>
												</div>
												<div className="flex space-x-2">
													<Button
														variant="outlined"
														onClick={() =>
															window.open(
																`https://www.youtube.com/watch?v=${item.video_id}`,
																"_blank"
															)
														}
														aria-label={`Watch ${item.title} on YouTube`}
													>
														<Video className="w-4 h-4" />
													</Button>
													<Button
														variant="contained"
														onClick={() => {
															removeMovieWatchlist(userUuid, item.title);
															setWatchlist((watchlist) =>
																watchlist.filter(
																	(elem) => elem.title !== item.title
																)
															);
														}}
														aria-label={`Remove ${item.title}`}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</li>
										))}
									</ul>
									{watchlist.length === 0 && (
										<p className="text-center text-muted-foreground mt-4">
											No items in the list
										</p>
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				</>
			)}
		</>
	);
}

export default UserSettings;
