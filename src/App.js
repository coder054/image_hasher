import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { imageHash } from "image-hash";
import { getMD5, getBase64, getSrc, truncate } from "./helpers";

function App() {
	const [images, setImages] = useState([]);
	const [url, setUrl] = useState("");
	const [currentMd5, setCurrentMd5] = useState(null);

	const getImage = async (imgUrl) => {
		try {
			const resp = await axios.get(imgUrl, {
				responseType: "arraybuffer",
			});
			if (resp.status === 200) {
				let base64 = getBase64(resp.data);
				var md5 = getMD5(base64);
				let src = getSrc(base64);
				let date = resp.headers["last-modified"];
				let size = resp.headers["content-length"];

				let existed =
					images.filter((o) => {
						return o.md5 === md5;
					}).length > 0;
				if (!existed) {
					const imagesNew = images.slice();
					imagesNew.push({
						url: imgUrl,
						base64,
						md5,
						src,
						date,
						size,
					});
					setImages(imagesNew);
					localStorage.setItem("images", JSON.stringify(imagesNew));
					setCurrentMd5(md5);
					setUrl("");
					return "success";
				} else {
					alert("Existed");
					setUrl("");
				}
			} else {
				alert("failed");
				return "failed";
			}
		} catch (err) {
			alert(err.message);
		}
	};

	const handleClickImage = (md5) => {
		setCurrentMd5(md5);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let result = await getImage(url);
	};
	useEffect(() => {
		let a1 = JSON.parse(localStorage.getItem("images"));
		if (a1) {
			setImages(a1);
		}
	}, []);
	const image = images.filter((o) => {
		return o.md5 === currentMd5;
	})[0];
	return (
		<div className="wr_app">
			<div className="top_sidebar">
				<h1>Image Hasher</h1>
				<form onSubmit={handleSubmit}>
					<input value={url} onChange={(e) => setUrl(e.target.value)} />
					<input type="submit" value="Hash it!" />
				</form>
			</div>
			<div className="main_content">
				<div className="sidebar">
					{images.map((o, index) => {
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
								<span>SHA1:</span> {image.md5}
							</p>
							<p className="imagemeta">
								<span>SHA256:</span> {image.md5}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
