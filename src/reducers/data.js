import { RECEIVE_API_DATA, CLICK_ITEM, CHANGE_URL } from "../actions";
import produce from "immer";
import { getMD5, getBase64, getSrc, truncate } from "./../helpers";

const INITIAL_STATE = {
	images: JSON.parse(localStorage.getItem("images")) || [],
	url: "",
	currentMd5: null,
};

export default produce((draft, action) => {
	switch (action.type) {
		case RECEIVE_API_DATA:
			//TODO
			if (action.data.status === 200) {
				let base64 = getBase64(action.data.data);
				var md5 = getMD5(base64);
				let src = getSrc(base64);
				let date = action.data.headers["last-modified"];
				let size = action.data.headers["content-length"];

				let existed =
					draft.images.filter((o) => {
						return o.md5 === md5;
					}).length > 0;
				if (!existed) {
					let newImage = {
						url: action.data.request.responseURL,
						base64,
						md5,
						src,
						date,
						size,
					};
					draft.images.push(newImage);
					localStorage.setItem("images", JSON.stringify(draft.images));
					draft.currentMd5 = md5;
					draft.url = "";
					console.log({ draft });
				} else {
					alert("Existed");
					draft.url = "";
				}
			} else {
				alert("failed");
			}
			break;

		case CLICK_ITEM:
			draft.currentMd5 = action.md5;
			break;

		case CHANGE_URL:
			draft.url = action.url;
			break;
	}
}, INITIAL_STATE);
