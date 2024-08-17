import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);
    if (!url) {
      return alert("Enter the website link");
    }
    setLoader(true);
    setImageUrl("");
    try {
      const response = await fetch(
        `https://shot.screenshotapi.net/screenshot?token=XZ3Q9N0-QH84Z3N-MS9YJ45-K393HWC&url=${url}`
      );
      const data = await response.json();
      // console.log(data);
      setImageUrl(data.screenshot);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching screenshot:", error);
      alert("Something went Wrong, try again later");
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <h1>Capture Any Website Screenshot in Seconds</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
          />{" "}
          <span
            onClick={() => {
              setUrl("");
              setImageUrl("");
            }}
          >
            x
          </span>
        </div>
        <button type="submit">Generate </button>
      </form>

      {loader && (
        <div className="loader">
          <h2>Image Loading, Please Wait...</h2>
        </div>
      )}
      {imageUrl && (
        <div className="image">
          <img src={imageUrl} alt="Website Thumbnail" />
          <p>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              [Open Image in new Tab]
            </a>
            <a href={imageUrl} download="screenshot.png" target="_blank">
              <button>Download</button>
            </a>
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(imageUrl);
              setCopied(true);
            }}
          >
            {copied ? "Copied✓" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
