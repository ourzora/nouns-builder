import axios from "axios";

const UPLOAD_API =
  process.env.NEXT_PUBLIC_UPLOAD_API || "https://upload-api.zora.co";

export const uploadApi = axios.create({
  baseURL: UPLOAD_API,
});
