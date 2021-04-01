import React, { useState, useEffect } from "react";

import axios from "axios";
import { imageHash } from "image-hash";
import { getMD5, getBase64, getSrc, truncate } from "./helpers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestApiData, clickItem, changeUrl } from "./actions";

const Home = ({
	requestApiData,
	images,
	clickItem,
	currentMd5,
	url,
	changeUrl,
}) => {
	const getImage = async (imgUrl) => {
		await requestApiData(imgUrl);
	};

	const handleClickImage = (md5) => {
		clickItem(md5);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await getImage(url);
	};

	const digestMessage = async (message) => {
		// const encoder = new TextEncoder();
		// const data = encoder.encode(message);
		// const hash = await crypto.subtle.digest("SHA-256", data);
		// console.log({ hash, aaa: hash.toString() });
		// return hash;
		/////////////////////////////
	};




	useEffect(() => {
		digestMessage("aaa");
		//TODO get data from localstorage to redux
		// let a1 = JSON.parse(localStorage.getItem("images"));
		// if (a1) {
		// 	setImages(a1);
		// }
		//
	}, []);
	const image = images.filter((o) => {
		return o.md5 === currentMd5;
	})[0];

	return (
		<div className="wr_app">
			<div className="top_sidebar">
				<h1>Image Hasher</h1>
				<form onSubmit={handleSubmit}>
					<input
						value={url}
						onChange={(e) => {
							changeUrl(e.target.value);
						}}
					/>
					<input type="submit" value="Hash it!" />
				</form>
			</div>
			<div className="main_content">
				<div className="sidebar">
					{(images || []).map((o, index) => {
						return (
							<div
								onClick={() => handleClickImage(o.md5)}
								key={o.md5}
								className={`wr_imagerow ${
									o.md5 === currentMd5 ? "active" : ""
								}`}
							>
								<div className="wr_image">
									<img src={o.src} />
								</div>
								<div className="wr_imagecontent">
									<p className="imgtime">{o.date}</p>
									<p className="imgurl">{truncate(o.url, 50)}</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className="content">
					{image && (
						<div class="wr_detail">
							<div class="wr_detailimage">
								<img src={image.src} alt="" />
							</div>
							<p className="imagemeta">
								<span>URL:</span>{" "}
								<span style={{ textOverflow: "ellipsis" }}>
									{truncate(image.url, 80)}
								</span>
							</p>
							<p className="imagemeta">
								<span>Size:</span> {image.size}
							</p>
							<p className="imagemeta">
								<span>MD5:</span> {image.md5}
							</p>
							<p className="imagemeta">
								<span>SHA1:</span> {image.sha1}
							</p>
							<p className="imagemeta">
								<span>SHA256:</span> {image.sha256}
							</p>
							<p className="imagemeta">
								<span>PBKDF2:</span> {image.PBKDF2}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	images: state.data.images,
	url: state.data.url,
	currentMd5: state.data.currentMd5,
});
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ requestApiData, clickItem, changeUrl }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
