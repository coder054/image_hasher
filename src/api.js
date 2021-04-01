import axios from "axios";

import { getMD5, getBase64, getSrc, truncate, toHexString } from "./helpers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestApiData } from "./actions";

export const fetchData = async (imgUrl) => {
	//TODO
	try {
		const resp = await axios.get(imgUrl, {
			responseType: "arraybuffer",
		});
		const abSha1 = await crypto.subtle.digest("SHA-1", resp.data);
		const abSha256 = await crypto.subtle.digest("SHA-256", resp.data);
		const sha1 = toHexString(abSha1);
		const sha256 = toHexString(abSha256);
		resp.sha1 = sha1;
		resp.sha256 = sha256;
		return resp;
	} catch (err) {
		alert(err.message);
	}
};
