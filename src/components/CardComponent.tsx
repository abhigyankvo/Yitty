import axios from "axios";
import { ChangeEvent, CSSProperties, useEffect, useState } from "react";
import { IFormatDetails, ISelected, IVideoInfo } from "../types/interfaces";
import { serverBaseUrl } from "../utils/data";
import { BiTime, BiErrorCircle } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import { AiFillYoutube } from "react-icons/ai";
import { MdModeNight, MdLightMode } from "react-icons/md";
import RiseLoader from "react-spinners/RiseLoader";

import { getFileSize, getVideoLength } from "../utils";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};
interface IProps {
  url: string;
  theme: string;
  handleTheme: (mode: string) => void;
}
function CardComponent({ url, theme, handleTheme }: IProps) {
  const [videoInfo, setVideoInfo] = useState<IVideoInfo>();
  const [selected, setSelected] = useState<ISelected>({
    quality: "quality",
    audioItag: 0,
    totalSize: 0,
  });
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const res = await axios.get(`${serverBaseUrl}/getinfo`, {
          params: {
            url,
          },
        });
        console.log(res);
        setVideoInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    url && getVideoDetails();
  }, [url]);
  const handleDownload = () => {
    if (selected.audioItag) {
      const a = document.createElement("a");
      const newTitle = videoInfo?.videoDetails.title.replace(
        /[^a-zA-Z0-9-_]/g,
        ""
      );
      a.href = `${serverBaseUrl}/download?title=${newTitle}&url=${url}&audioItag=${
        selected.audioItag
      }${selected.videoItag ? "&videoItag=" + selected.videoItag : ""}`;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (!alert) {
      setAlert(true);
    }
  };
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (videoInfo) {
      setAlert(false);
      const { value } = e.target;
      console.log("value", value);
      let tempState: ISelected = {
        quality: value,
        totalSize: parseInt(videoInfo.audioFormat.size),
        audioItag: videoInfo.audioFormat.itag,
      };
      if (value !== "Audio Only") {
        const videoQuality = videoInfo.videoFormats.find(
          (item) => item.quality === value
        ) as IFormatDetails;
        tempState.videoItag = videoQuality?.itag;
        tempState.totalSize += parseInt(videoQuality?.size);
      }
      setSelected(tempState);
    }
  };
  return (
    <>
      {videoInfo ? (
        <div className="h-full w-full flex flex-col gap-3 justify-center items-center">
          {/* Top Section */}
          <div className="h-[10%] w-full flex items-center justify-between">
            <AiFillYoutube className="text-2xl text-textDark dark:text-buttonLight" />
            {theme === "dark" ? (
              <MdLightMode
                className="text-2xl text-yellow-400"
                onClick={() => handleTheme("light")}
              />
            ) : (
              <MdModeNight
                className="text-2xl text-lightPrimary"
                onClick={() => handleTheme("dark")}
              />
            )}
          </div>
          {/* Middle Section */}
          <div className="bg-bgLight dark:bg-darkSecondary h-[60%] w-full flex rounded-lg">
            <img
              src={videoInfo.videoDetails.thumbnailImage}
              alt="Thumbail"
              className="rounded-lg w-44 object-cover object-center"
            />
            <div className="h-full w-full p-2 flex flex-col justify-between">
              <p className="text-textDark dark:text-textLight text-sm">
                {videoInfo.videoDetails.title.length > 60
                  ? videoInfo.videoDetails.title.substring(0, 59) + "..."
                  : videoInfo.videoDetails.title}
              </p>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center justify-center gap-1">
                  <BiTime className="text-sm text-textDark dark:text-textLight" />
                  <p className="text-xs text-textDark dark:text-textLight">
                    {getVideoLength(videoInfo.videoDetails.length)}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <HiDownload className="text-sm text-textDark dark:text-textLight" />
                  <p className="text-xs text-textDark dark:text-textLight">
                    {getFileSize(selected.totalSize)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="h-[20%] w-full flex items-center justify-between">
            <div className="flex justify-center items-center gap-2">
              <select
                name="quality"
                id="quality"
                onChange={handleOnChange}
                value={selected.quality}
                className="bg-bgLight dark:bg-darkSecondary px-2 py-2 text-sm text-textDark dark:text-textLight rounded-md"
              >
                <option key="quality" value="quality" disabled>
                  Select Quality
                </option>
                {videoInfo.videoFormats.map((format) => (
                  <option key={format.quality} value={format.quality}>
                    {`${format.quality}`}
                  </option>
                ))}
                <option
                  key={videoInfo.audioFormat.quality}
                  value={videoInfo.audioFormat.quality}
                >
                  {videoInfo.audioFormat.quality}
                </option>
              </select>
              {alert && <BiErrorCircle className="text-base text-red-500" />}
            </div>
            <button
              className="bg-darkPrimary dark:bg-buttonLight text-sm text-white px-3 py-2 rounded-md hover:bg-[#1c356b] dark:hover:bg-[#0ca3fa]"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      ) : (
        <RiseLoader
          color={"#59BEF8"}
          loading={true}
          cssOverride={override}
          size={12}
        />
      )}
    </>
  );
}

export default CardComponent;
