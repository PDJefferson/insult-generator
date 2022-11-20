//headers to set the type of content been fetched to
//a json format and only accept said content
let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

export async function fetchInsult(index ) {
   //gets the response from the api
  const fetchData = async () => {
    const response = await fetch(
      `/generate_insult.php?&type=json&number=${index}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    //if there is an error throw it with the message
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  };

  //get the data from the response and returns unless an error is found
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error("the error is the following: ", error);
    return;
  }
}
