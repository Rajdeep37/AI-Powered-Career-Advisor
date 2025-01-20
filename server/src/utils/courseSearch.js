import axios from "axios";
const courseSearch = async (s) => {
  const options = {
    method: "GET",
    url: "https://paid-udemy-course-for-free.p.rapidapi.com/search",
    params: { s: s },
    headers: {
      "x-rapidapi-key": process.env.COURSE_API_KEY,
      "x-rapidapi-host": process.env.COURSE_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error);
  }
};

export default courseSearch