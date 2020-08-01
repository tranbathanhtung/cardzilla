const request = (params, headers = {}) =>
  fetch(`https://dev.to/api/${params}`, {
    method: "GET",
    headers,
  });

export const fetchDevArticles = async username => {
  if (!username) {
    throw new Error("Invalid username");
  }
  try {
    const res = await request(`articles?username=${username}`);
    // const data = await res.body();
    if (res.status === 404 || !res.ok) {
      throw new Error("User not found");
    } else {
      const data = await res.json();
      return data;
    }
  } catch(err) {
    throw err;
  }
}