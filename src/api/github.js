const request = (params, headers) =>
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  });

const fetcher = (variables, token) => {
  return request(
    {
      query: `
      fragment UserInfo on User {
          email
          name
          url
          following {
            totalCount
          }
          followers {
            totalCount
          }
          starredRepositories {
            totalCount
          }
          pinnedItems(first: 5) {
            totalCount
            nodes {
              ... on Repository {
                id
                name
                description
                forkCount
                stargazers {
                  totalCount
                }
                url
                primaryLanguage {
                  color
                  id
                  name
                }
              }
            }
          }
      }
      query getUser($login: String!) {
        user(login: $login) {
          ...UserInfo
        }
      }
    `,
      variables,
    },
    {
      Authorization: `bearer 04b79e49706d79c7bbb8e30c7504ce11966c51e9`,
    }
  );
};

export const fetchGithubUser = async (username) => {
  if (!username) {
    throw new Error("Invalid username");
  }
  const res = await fetcher({ login: username });
  const data = await res.json();
  console.log(data);
}