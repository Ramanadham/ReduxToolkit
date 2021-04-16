import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import {
	fetchToken,
	selectToken,
	jwtAuth,
	authStatus,
	authTime,
} from "../redux/tokenSlice"; // token

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const AppHeader = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const token = useSelector(selectToken);
	const tokenStatus = useSelector((state) => state.tokenloader.status);

	const tokenAuthenticationStatus = useSelector(authStatus);
	const AuthenticationTime = useSelector(authTime);

	const handleOpen = () => {
		if (tokenStatus === "success") {
			dispatch(jwtAuth(token));
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (tokenStatus === "idle") {
			dispatch(fetchToken());
		}
	}, [dispatch, tokenStatus]);

	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id="transition-modal-title">
							Token Authentication {tokenAuthenticationStatus}
						</h2>
						<p id="transition-modal-description">{AuthenticationTime}</p>
					</div>
				</Fade>
			</Modal>

			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Demo Application
					</Typography>
					<Button color="inherit" onClick={handleOpen}>
						Click for Token Authentication
					</Button>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default AppHeader;
