import axios from "axios";
const jobSearch = async (query) => {
  const options = {
    method: "GET",
    url: "https://linkedin-data-scraper.p.rapidapi.com/search_jobs",
    params: {
      query: query,
      page: "1",
      searchLocationId: "102713980",
      sortBy: "DD",
    },
    headers: {
      "x-rapidapi-key": process.env.JOB_API_KEY,
      "x-rapidapi-host": process.env.JOB_API_HOST,
       
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.response
    //console.log(response.data.response);
  } catch (error) {
    
    console.error(error);
    return null
  }
};

export default jobSearch
//jobSearch("Software Developer")
