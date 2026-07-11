import axios from "axios";
import { ImportResponse } from "@/types/crm";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api",
});

export const uploadCSV = async (
  file: File
): Promise<ImportResponse> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<ImportResponse>(
    "/import",
    formData
  );

  return response.data;
};

export default api;