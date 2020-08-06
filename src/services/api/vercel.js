const request = (url, options) =>
  fetch(`https://api.vercel.com${url}`, options);

function getDefaultHeaders(token) {
  if (!token) {
    throw new Error("You have no Vercel token");
  }

  return {
    // Accept: "application/json",
    // "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };
}

export const fetchVercelUser = async (vercel) => {
  if (!vercel) {
    throw new Error("Invalid vercel");
  }
  try {
    const response = await request("/www/user", {
      method: "GET",
      headers: getDefaultHeaders(vercel?.token),
    });

    const data = await response.json();
    return data.user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export async function fetchProject(vercel, name = "") {
  try {
    const response = await request(`/v1/projects/${name}`, {
      headers: getDefaultHeaders(vercel?.token),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function fetchDeployments(vercel, name = "") {
  try {
    const response = await request(`/v5/now/deployments`, {
      headers: getDefaultHeaders(vercel?.token),
    });
    const data = await response.json();
    const deploysNoAlias = data.deployments
      .filter((d) => d.name === name)
      .sort((a, b) => (a.created < b.created ? 1 : -1));
    return deploysNoAlias;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const fetchAccessToken = async (code) => {
  try {
    const response = await request(`/v2/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_id=${process.env.REACT_APP_VERCEL_CLIENT_ID_DEV}&client_secret=${process.env.REACT_APP_VERCEL_CLIENT_SECRET_DEV}&code=${code}&redirect_uri=http://localhost:3000`,
    });
    const { access_token } = await response.json();

    return access_token;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const vercelDeploy = async (vercel, params) => {
  try {
    const response = await request(`/v12/now/deployments`, {
      method: "POST",
      headers: getDefaultHeaders(vercel?.token),
      body: JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
