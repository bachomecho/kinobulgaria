import { useState, useRef, useContext } from "react";
import Button from "@mui/material/Button";
import {
	List,
	Card,
	CardContent,
	CardHeader,
	Avatar,
	TextField,
} from "@mui/material";
import { TWatchlist } from "../../../server/api";
import Header from "../Header";
import { removeMovieWatchlist, watchlistContext } from "../../App";

function UserSettings({ userUuid }: { userUuid: string }) {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [oldPasswordError, setOldPasswordError] = useState("");
	const { watchlist, setWatchlist, watchlistChanged, setWatchlistChanged } =
		useContext(watchlistContext);
	const username = useRef("");
	console.log("user settings watchlist: ", watchlist);

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
									alt={username.current}
								/>
							</Avatar>
							<div>
								<h2 className="text-2xl font-bold">{username.current}</h2>
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

						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Your Watchlist</h3>
							<List
								className="h-[200px] rounded-md border p-4"
								style={{ maxHeight: 200, overflow: "auto" }}
							>
								<ul className="space-y-2">
									{watchlist.map((movie: TWatchlist) => (
										<li
											key={movie.id}
											className="flex justify-between items-center"
										>
											<span>{movie.title}</span>
											<span className="text-muted-foreground">
												{movie.year}
											</span>
											<span>-</span>
											<button
												onClick={() => {
													setWatchlist(
														removeMovieWatchlist(watchlist, movie.title)
													);
													setWatchlistChanged(!watchlistChanged);
												}}
											>
												-
											</button>
										</li>
									))}
								</ul>
							</List>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default UserSettings;
