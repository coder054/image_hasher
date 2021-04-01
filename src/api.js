import axios from "axios";

import { getMD5, getBase64, getSrc, truncate, toHexString } from "./helpers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestApiData } from "./actions";

const getDerivedBits = async (
	saltBuffer,
	keyMaterial,
	iterations,
	bitLength
) => {
	const params = {
		name: "PBKDF2",
		salt: saltBuffer,
		iterations: iterations,
		hash: "SHA-256",
	};
	return await window.crypto.subtle.deriveBits(params, keyMaterial, bitLength);
};

const getKeyMaterial = async (passwordString) => {
	const passwordBuffer = new TextEncoder().encode(passwordString);
	return await crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, [
		"deriveBits",
	]);
};

function str2ab(str) {
	var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

export const fetchData = async (imgUrl) => {
	//TODO
	try {
		const resp = await axios.get(imgUrl, {
			responseType: "arraybuffer",
		});
		const abSha1 = await crypto.subtle.digest("SHA-1", resp.data);
		const abSha256 = await crypto.subtle.digest("SHA-256", resp.data);
		let saltBuffer = str2ab(resp.request.responseURL);
		console.log({ saltBuffer });
		let keyMaterial = await getKeyMaterial("correcthorsebatterystaple");
		let abPBKDF2 = await getDerivedBits(saltBuffer, keyMaterial, 100000, 160);
		let PBKDF2 = toHexString(abPBKDF2);

		const sha1 = toHexString(abSha1);
		const sha256 = toHexString(abSha256);
		resp.sha1 = sha1;
		resp.sha256 = sha256;
		resp.PBKDF2 = PBKDF2;
		return resp;
	} catch (err) {
		alert(err.message);
	}
};
