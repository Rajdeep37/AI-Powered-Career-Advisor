import axios from "axios";
export async function jobSearch(){
  const options = {
    method: 'GET',
    url: 'https://linkedin-data-api.p.rapidapi.com/search-jobs',
    params: {
      keywords: "Software Engineer",
      locationId: '102713980',
      datePosted: 'anyTime',
      sort: 'mostRelevant'
    },
    headers: {
      'x-rapidapi-key': 'a1b937cc71msh8fc5beb0fcfdf09p12b55bjsnca363a90ff79',
      'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    //return response.data;
  } catch (error) {
    console.error(error);
  }
}

// jobSearch();