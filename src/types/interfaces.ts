export interface IVideoDetails {
  title: string;
  length: string;
  thumbnailImage: string;
}
export interface IFormatDetails {
  quality: string;
  itag: number;
  size: string;
}
export interface IVideoInfo {
  videoDetails: IVideoDetails;
  videoFormats: IFormatDetails[];
  audioFormat: IFormatDetails;
}
export interface ISelected {
  quality: string;
  videoItag?: number;
  audioItag: number;
  totalSize: number;
}
