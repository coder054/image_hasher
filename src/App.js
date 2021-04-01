import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import Home from "./Home";
import store from "./store";

function App() {
	return (
		<Provider store={store}>
			<Home />
		</Provider>
	);
}

export default App;
