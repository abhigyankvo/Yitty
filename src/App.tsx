import { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import { isUrlYoutubeVideo } from "./utils";
import NotFound from "./assets/notFound.svg";
function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [theme, setTheme] = useState("light");
  const handleTheme = (mode: string) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };
  useEffect(() => {
    const localtheme = localStorage.getItem("theme");
    console.log(localtheme);
    setTheme(localtheme || "light");
  }, []);
  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          const url = tabs[0].url;
          url && isUrlYoutubeVideo(url) && setVideoUrl(url);
        }
      );
  }, []);

  return (
    <div className={`${theme}`}>
      <div
        className={`w-96 h-64 bg-white drop-shadow-md dark:bg-darkPrimary p-4 flex flex-col justify-center items-center`}
      >
        {videoUrl ? (
          <CardComponent
            url={videoUrl}
            theme={theme}
            handleTheme={handleTheme}
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img src={NotFound} alt="" className="w-32" />
            <p className="text-base text-buttonLight">
              Play a YouTube video to download it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
