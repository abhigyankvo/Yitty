export const getVideoLength = (seconds: string) => {
  const sec = parseInt(seconds);
  const h: number = Math.floor(sec / 3600);
  const m: number = Math.floor((sec % 3600) / 60);
  const s: number = Math.floor((sec % 3600) % 60);
  return h > 0
    ? h + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2)
    : ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
};
export const getFileSize = (sizeInBytes: number) => {
  const gb = Math.round((sizeInBytes / 1e9) * 10) / 10;
  const mb = Math.round(((sizeInBytes % 1e9) / 1e6) * 10) / 10;
  console.log(sizeInBytes, gb, mb);
  return gb > 1 ? gb + "GB" : mb + "MB";
};

export const isUrlYoutubeVideo = (url: string): boolean => {
  var p =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  var matches = url.match(p);
  return matches ? true : false;
};
