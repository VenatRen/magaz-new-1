import React, { useState, useEffect } from "react";
import { AppRegistry } from "react-native";
import { expo } from "./app.json";
import { createDBTables } from "./utils/db_handler";
import SyncStorage from "sync-storage";

import "react-native-get-random-values";
import "./i18n";
import "./utils";

import Main from "./Main";
import LoadingScreen from "./components/pages/LoadingScreen";

const App = () => {
	const [loaded, setLoaded] = useState(false);

	const initApp = async () => {
		await SyncStorage.init();
		console.log("SyncStorage initialized.");
		await createDBTables();
		console.log("Database initialized.");

		setLoaded(true);
	};
	useEffect( () => {
		initApp();
	}, []);

	return (
		loaded ?
			<Main/>
		:
			<LoadingScreen />
	);
};

AppRegistry.registerComponent(expo.name, App, null);

export default App;