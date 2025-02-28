import axios from "axios";

const API_KEY = "49079569-ff8624e89e8813a2e30953c9b"; 
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages (query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: 40,
  };

 try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
 } catch (error) {
   throw error;
 }
};