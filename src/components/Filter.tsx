import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Filter({
	filterState,
	setFilterQuery,
}: {
	filterState: FilterProps;
	setFilterQuery: React.Dispatch<React.SetStateAction<FilterProps>>;
}) {
	return (
		<div className="grid gap-4">
			<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
				<div className="flex items-center gap-2 text-sm font-medium">
					<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
						<InputLabel
							sx={{
								"&.Mui-focused": {
									color: "green",
								},
							}}
						>
							Year
						</InputLabel>
						<Select
							labelId="demo-select-small-label"
							className="w-32"
							id="year"
							value={filterState.yearRange}
							label="Age"
							onChange={(event: SelectChangeEvent) =>
								setFilterQuery({
									...filterState,
									yearRange: event.target.value,
								})
							}
							sx={{
								"&:hover .MuiOutlinedInput-notchedOutline": {
									borderColor: "green",
								},
								"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "green",
								},
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={"1950-1960"}>1950-1960</MenuItem>
							<MenuItem value={"1960-1970"}>1960-1970</MenuItem>
							<MenuItem value={"1970-1980"}>1970-1980</MenuItem>
							<MenuItem value={"1980-1990"}>1980-1990</MenuItem>
							<MenuItem value={"1990-2000"}>1990-2000</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
		</div>
	);
}
