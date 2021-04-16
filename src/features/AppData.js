import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, selectData } from "../redux/dataSlice";
import CircularProgress from "@material-ui/core/CircularProgress";

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "name", headerName: "Name", width: 130 },
	{ field: "year", headerName: "Year", width: 130 },
	{ field: "color", headerName: "Color", width: 130 },
	{ field: "pantone_value", headerName: "Pantone value", width: 180 },
];

const AppData = () => {
	const dispatch = useDispatch();
	const data = useSelector(selectData);
	const dataStatus = useSelector((state) => state.dataloader.status);
	const tokenStatus = useSelector((state) => state.tokenloader.status);

	useEffect(() => {
		if (dataStatus === "idle" && tokenStatus === "success") {
			dispatch(fetchData());
		}
	}, [dataStatus, dispatch, tokenStatus]);

	return (
		<>
			{(dataStatus === "loading" || dataStatus === "idle") && (
				<div
					style={{
						alignItems: "center",
						display: "flex",
						justifyContent: "center",
						height: "100vh",
						width: "100vw",
					}}
				>
					<CircularProgress />
					<span
						style={{ justifyContent: "center", position: "fixed", top: "55%" }}
					>
						{dataStatus === "loading" && <div>Loading...please wait</div>}
						{dataStatus === "idle" && (
							<div>
								Check the server connection. {process.env.REACT_APP_API_URL}
							</div>
						)}
					</span>
				</div>
			)}

			{dataStatus === "success" && (
				<div style={{ height: 500, width: "100%" }}>
					<DataGrid
						rows={data.data}
						columns={columns}
						pageSize={data.per_page}
					/>
				</div>
			)}
		</>
	);
};

export default AppData;
