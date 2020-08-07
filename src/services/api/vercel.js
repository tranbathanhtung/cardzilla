import {
  REACT_APP_VERCEL_CLIENT_ID,
  REACT_APP_VERCEL_CLIENT_SECRET,
  IS_PROD,
} from "constants/env";

const redirectUri = IS_PROD ? "https://cardzilla.vercel.app" : "http://localhost:3000";

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
    if (!name) return null;
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

export const fetchAccessToken = async (code) => {
  try {
    const response = await request(`/v2/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_id=${REACT_APP_VERCEL_CLIENT_ID}&client_secret=${REACT_APP_VERCEL_CLIENT_SECRET}&code=${code}&redirect_uri=${redirectUri}`,
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
