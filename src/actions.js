export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";
export const CLICK_ITEM = "CLICK_ITEM";
export const CHANGE_URL = "CHANGE_URL";

export const requestApiData = (imgUrl) => ({ type: REQUEST_API_DATA, imgUrl });
export const receiveApiData = (data) => ({ type: RECEIVE_API_DATA, data });
export const clickItem = (md5) => ({ type: CLICK_ITEM, md5 });
export const changeUrl = (url) => {
	return { type: CHANGE_URL, url };
};
