import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppHeader from "./features/AppHeader";
import AppData from "./features/AppData";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

function App() {
	console.log(process.env);

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppHeader />
			<AppData />
		</div>
	);
}

export default App;
