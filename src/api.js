import axios from "axios";

import { getMD5, getBase64, getSrc, truncate } from "./helpers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestApiData } from "./actions";

export const fetchData = async (imgUrl) => {
	//TODO
	try {
		const resp = await axios.get(imgUrl, {
			responseType: "arraybuffer",
		});
		return resp;
	} catch (err) {
		alert(err.message);
	}
};
