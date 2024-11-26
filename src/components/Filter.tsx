import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { X } from "lucide-react";

export default function Filter({
	filterState,
	setFilterQuery,
	setRemoveFilters,
	genreList,
}: {
	filterState: FilterProps;
	setFilterQuery: React.Dispatch<React.SetStateAction<FilterProps>>;
	setRemoveFilters: React.Dispatch<React.SetStateAction<boolean>>;
	genreList: string[];
}) {
	let emptyString = "";
	return (
		<div className="grid gap-4">
			<div className="flex flex-col sm:flex-row px-8 items-center sm:items-center sm:gap-8 w-full">
				<div className="flex flex-col sm:flex-row sm:gap-4 w-full">
					<FormControl
						className="w-full sm:w-auto"
						sx={{ m: 0.5, minWidth: 120 }}
						size="small"
					>
						<InputLabel
							sx={{
								"&.Mui-focused": {
									color: "black",
								},
							}}
						>
							Година
						</InputLabel>
						<Select
							labelId="demo-select-small-label"
							className="w-full sm:w-32"
							id="year"
							value={!emptyString ? filterState.yearRange : ""}
							label="godina"
							onChange={(event: SelectChangeEvent) =>
								setFilterQuery({
									...filterState,
									yearRange: event.target.value,
								})
							}
							sx={{
								"&:hover .MuiOutlinedInput-notchedOutline": {
									borderColor: "#FFD700",
								},
								"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "#FFD700",
								},
							}}
						>
							<MenuItem
								sx={{ color: "red" }}
								value={""}
								onClick={() => (emptyString = "something")}
							>
								Премахни филтер
							</MenuItem>
							<MenuItem value={"1950-1960"}>1950-1960</MenuItem>
							<MenuItem value={"1960-1970"}>1960-1970</MenuItem>
							<MenuItem value={"1970-1980"}>1970-1980</MenuItem>
							<MenuItem value={"1980-1990"}>1980-1990</MenuItem>
							<MenuItem value={"1990-2000"}>1990-2000</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						className="w-full sm:w-auto"
						sx={{ m: 0.5, minWidth: 120 }}
						size="small"
					>
						<InputLabel
							sx={{
								"&.Mui-focused": {
									color: "black",
								},
							}}
						>
							Времетраене
						</InputLabel>
						<Select
							labelId="demo-select-small-label"
							className="w-full sm:w-40"
							id="duration"
							value={!emptyString ? filterState.duration : ""}
							label="vremetraenee"
							onChange={(event: SelectChangeEvent) =>
								setFilterQuery({
									...filterState,
									duration: event.target.value,
								})
							}
							sx={{
								"&:hover .MuiOutlinedInput-notchedOutline": {
									borderColor: "#FFD700",
								},
								"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "#FFD700",
								},
							}}
						>
							<MenuItem
								sx={{ color: "red" }}
								value={""}
								onClick={() => (emptyString = "something")}
							>
								Премахни филтер
							</MenuItem>
							<MenuItem value={"до 1 час"}>до 1 час</MenuItem>
							<MenuItem value={"1 - 1.5 часа"}>1 - 1.5 часа</MenuItem>
							<MenuItem value={"1.5 - 2 часа"}>1.5 - 2 часа</MenuItem>
							<MenuItem value={"над 2 часа"}>над 2 часа</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						className="w-full sm:w-auto"
						sx={{ m: 0.5, minWidth: 120 }}
						size="small"
					>
						<InputLabel
							sx={{
								"&.Mui-focused": {
									color: "black",
								},
							}}
						>
							Жанр
						</InputLabel>
						<Select
							labelId="demo-select-small-label"
							className="w-full sm:w-40"
							id="genre"
							value={!emptyString ? filterState.genre : ""}
							label="janree"
							onChange={(event: SelectChangeEvent) =>
								setFilterQuery({
									...filterState,
									genre: event.target.value,
								})
							}
							sx={{
								"&:hover .MuiOutlinedInput-notchedOutline": {
									borderColor: "#FFD700",
								},
								"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "#FFD700",
								},
							}}
						>
							<MenuItem
								sx={{ color: "red" }}
								value={""}
								onClick={() => (emptyString = "something")}
							>
								Премахни филтер
							</MenuItem>
							{genreList.map((genre) => (
								<MenuItem value={genre}>{genre}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<Button
					className="sm:w-auto"
					size="small"
					variant="outlined"
					color="error"
					onClick={() => setRemoveFilters(true)}
				>
					<X />
				</Button>
			</div>
		</div>
	);
}
