import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setCopied(false);
    if (!url) {
      return alert("Enter the website link");
    }
    setLoader(true);
    // setImageUrl("");
    try {
      const response = await fetch(
        `https://shot.screenshotapi.net/screenshot?token=R0AY1RZ-KRN481B-HS0T34G-23NZR6G&url=${url}`
      );
      const data = await response.json();
      console.log(data);
      setImageUrl(data.screenshot);
    } catch (error) {
      console.error("Error fetching screenshot:", error);
      alert("Something went Wrong, try again later");
    }
    setLoader(false);
    setUrl("");
  };

  return (
    <>
      {!imageUrl && (
        <div className="container">
          <h1>
            Turn Any URL into a <br /> Stunning Screenshot
          </h1>
          <p>
            Simply enter a URL and get a high-quality screenshot in seconds.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste URL"
              />
            </div>
            <button type="submit" disabled={loader}>
              {loader ? "Loading..." : "📷 Get Screenshot"}{" "}
            </button>
          </form>
        </div>
      )}
      {imageUrl && (
        <div className="image">
          <h1>Your Screenshot is Ready</h1>
          <p>You can copy the screenshot</p>
          <div>
            <button onClick={() => setImageUrl("")}> ↶ Start Over</button>
            <button
              className="copy"
              onClick={() => {
                navigator.clipboard.writeText(imageUrl);
                setCopied(true);
              }}
            >
              {" "}
              {copied ? "📋 Copied" : " 📋 Copy"}
            </button>
          </div>
          <img src={imageUrl} alt="Website Thumbnail" />
          {/* <p>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              [Open Image in new Tab]
            </a>
          </p> */}
          {/* <button
            onClick={() => {
              navigator.clipboard.writeText(imageUrl);
              setCopied(true);
            }}
          >
            {copied ? "Copied✓" : "Copy"}
          </button> */}
        </div>
      )}
    </>
  );
};

export default App;
