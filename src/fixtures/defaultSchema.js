const config = {
  // Profile Stack
  profile: {
    badge: "Badge",
    avatarURL:
      "",
    name: "Mr.Smith",
    address: "Address",
    bio:
      "he/him. Working [@link](https://www.google.com) and [#tag](https://www.google.com)",
    socials: [
      {
        type: "github",
        link: "https://github.com/tranbathanhtung/cardzilla",
      },
    ],
    skills: [{ name: "Skill", color: "gray" }],
  },
  // Github Stack
  github: {
    username: "",
    htmlUrl: "",
    followers: 0,
    following: 0,
    starredRepositories: 0,
    sponsorUrl: "",
    repos: [
      {
        name: "Your repository",
        htmlUrl: "",
        description: "Repository description",
        language: "Javascript",
        languageColor: "#f1e05a",
        star: 0,
        fork: 0
      },
    ],
  },
  // Articles Stack
  articles: [
    {
      title: "Your article",
      htmlUrl: "",
      description: "article description",
      reaction: 0,
      comment: 0,
    },
  ],
  // Contact Stack
  contact: {
    email: "email@gmail.com",
    phone: "(+xx) xxxxxxxx",
    address: "Address",
  }
};

export default {
  name: "",
  title: "",
  description: "",
  theme: "light",
  color: "teal",
  createdAt: (new Date()).toISOString(),
  config: JSON.stringify(config),
};