import { useState, useContext, useEffect } from "react";
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
import { removeMovieWatchlist, authContext } from "../../App";

function UserSettings() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [oldPasswordError, setOldPasswordError] = useState("");
	const [watchlist, setWatchlist] = useState<TWatchlist[]>([]);
	const { userUuid } = useContext(authContext);

	useEffect(() => {
		fetch(`/api/watchlist/${userUuid}`, {
			method: "GET",
		})
			.then((res) => {
				if (!res.ok)
					throw new Error(
						`Error status code while fetching watchlist: ${res.status}`
					);
				return res.json();
			})
			.then((data: any) => {
				console.log("Fetched watchlist data:", data.watchlist);
				if (data.watchlist)
					setWatchlist(JSON.parse(data.watchlist.split("|").join(",")));
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

		console.log("user settings useruuid: ", userUuid);
		try {
			const response = await fetch(
				`/api/change-password/userUuid=${userUuid}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({
						oldPassword: oldPassword,
						newPassword: newPassword,
					}).toString(),
				}
			);

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
								<img
									src="/placeholder.svg?height=80&width=80"
									alt={"username"}
								/>
							</Avatar>
							<div>
								<h2 className="text-2xl font-bold">{"username"}</h2>
								<p className="text-muted-foreground">Member since 2023</p>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Password</h3>
							{!isChangingPassword ? (
								<Button onClick={() => setIsChangingPassword(true)}>
									Change Password
								</Button>
							) : (
								<form onSubmit={handlePasswordChange} className="space-y-4">
									{!oldPasswordError ? (
										<div className="space-y-2">
											<h3>Old Password</h3>
											<TextField
												id="old-password"
												type="password"
												value={oldPassword}
												onChange={(e) => setOldPassword(e.target.value)}
												required
											/>
										</div>
									) : (
										<div className="space-y-2">
											<h3>Old Password</h3>
											<TextField
												id="old-password"
												error
												type="password"
												value={oldPassword}
												onChange={(e) => setOldPassword(e.target.value)}
												required
												aria-errormessage={oldPasswordError}
											/>
										</div>
									)}
									<div className="space-y-2">
										<h3>New Password</h3>
										<TextField
											id="new-password"
											type="password"
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
											required
										/>
									</div>
									{confirmPassword !== newPassword ? (
										<TextField
											error
											name="confirm-password"
											label="ConfirmPassword"
											id="confirm-password-error-helper-text"
											variant="outlined"
											color="error"
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									) : (
										<TextField
											name="confirm-password"
											label="ConfirmPassword"
											id="confirm-password-helper-text"
											variant="outlined"
											color="success"
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									)}
									<div className="space-x-2">
										{confirmPassword !== newPassword ? (
											<Button type="submit" disabled>
												Save New Password
											</Button>
										) : (
											<Button type="submit">Save New Password</Button>
										)}
										<Button
											type="button"
											variant="outlined"
											onClick={() => setIsChangingPassword(false)}
										>
											Cancel
										</Button>
									</div>
								</form>
							)}
						</div>
						<h3 className="text-lg font-semibold">Movie List</h3>
						<div className="w-full max-w-md">
							<ul className="space-y-4">
								{watchlist.map((item, index) => (
									<li
										key={index}
										className="flex items-center space-x-4 bg-card p-4 rounded-lg shadow"
									>
										<img
											src={item.thumbnail_name}
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
												aria-label={`Watch ${item.title} trailer on YouTube`}
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
	);
}

export default UserSettings;
