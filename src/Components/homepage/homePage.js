import { React, useState } from "react";
import VideoRecorder from "react-video-recorder";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import "./homePage.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const region = "ap-southeast-1";
const bucketName = "laveshs3";
const accessKeyId = "AKIA5MNJRRMWGHBAT4IL";
const secretAccessKey = "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";

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
  params: {
    Bucket: bucketName,
  },
});

const handleUpload = (videoBlob) => {
  console.log(videoBlob);
  s3.putObject(
    {
      Key: `${uuidv4()}.mp4`,
      Body: videoBlob,
      ContentType: "video/mp4",
      ACL: "public-read",
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("video uploaded");
      }
    }
  );
};

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  return (
      <div className="main_container">
			<nav className="navbar">
				<h1>Neb.tics Kinesis Analysis</h1>
				<button className="white_btn" onClick={handleLogout}>
					Logout
				</button>
			</nav>

    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        margin: "20px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          margin: "20px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ width: "500px", height: "500px" }}>
          <VideoRecorder
            onRecordingComplete={(videoBlob) => {
              handleUpload(videoBlob);
            }}
          />
        </div>
        <div>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button
              variant="contained"
              style={{ backgroundColor: "#fff", color: "#000" }}
              onClick={() => handleUpload(selectedFile)}
              component="span"
            >
              Upload video file
            </Button>
          </label>
        </div>
      </div>
      <div>
        <div className="emotions">
          <h2>Emotions and Expressions</h2>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
