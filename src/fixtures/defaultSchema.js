const config = {
  // Profile Stack
  profile: {
    badge: "Pro",
    avatarURL:
      "https://media2.giphy.com/media/13PMpiayBvKFck/giphy.gif?cid=ecf05e47ijo4v4n7odhz15t5vhbrqy0glmttfktimuoloy96&rid=giphy.gif",
    name: "Mr.Smith",
    address: "Adress",
    bio:
      "he/him. Working [@link](https://www.google.com) and [#tag](https://www.google.com)",
    socials: [
      {
        type: "twitter",
        link: "https://www.google.com",
      },
    ],
    skills: [{ name: "New", color: "yellow" }],
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
    address: "Adress",
  }
};

export default {
  name: "default",
  theme: "light",
  color: "teal",
  createdAt: (new Date()).toISOString(),
  config: JSON.stringify(config),
};

// export default {
//   name: "default",
//   theme: "light",
//   color: "pink",
//   config: {
//     // Profile Stack
//     profile: {
//       badge: "Pro",
//       avatarURL:
//         "https://media2.giphy.com/media/13PMpiayBvKFck/giphy.gif?cid=ecf05e47ijo4v4n7odhz15t5vhbrqy0glmttfktimuoloy96&rid=giphy.gif",
//       name: "Trần Bá Thanh Tùng",
//       address: "Hà Nội, Việt Nam",
//       bio:
//         "he/him. Building [@tailzilla](https://www.google.com) and [@cardzilla](https://www.google.com). Past: dev [@logivan](https://www.google.com), [@solid.engineer](https://www.google.com)",
//       socials: [
//         {
//           type: "facebook",
//           link: "https://www.google.com",
//         },
//         {
//           type: "twitter",
//           link: "https://www.google.com",
//         },
//         {
//           type: "instagram",
//           link: "https://www.google.com",
//         },
//         {
//           type: "linkedin",
//           link: "https://www.google.com",
//         },
//       ],
//       skills: [{ name: "Javascript", color: "yellow" }, { name: "Graphql", color: "blue" }, { name: "MongoDB", color: "green" }],
//     },
//     // Github Stack
//     github: {
//       username: "tranbathanhtung",
//       htmlUrl: "https://github.com/tranbathanhtung",
//       followers: 59,
//       following: 49,
//       starredRepositories: 480,
//       sponsorUrl: "https://github.com/sponsor/tranbathanhtung",
//       repos: [
//         {
//           name: "tailzilla-app",
//           htmlUrl: "https://github.com/tranbathanhtung/react-fiber-implement",
//           description: "re-implement react fiber",
//           language: "Javascript",
//           languageColor: "#f1e05a",
//           star: 508,
//           fork: 26
//         },
//         {
//           name: "tailzilla-app",
//           htmlUrl: "https://github.com/tranbathanhtung/react-fiber-implement",
//           description: "re-implement react fiber",
//           language: "Javascript",
//           languageColor: "#f1e05a",
//           star: 508,
//           fork: 26
//         },
//         {
//           name: "tailzilla-app",
//           htmlUrl: "https://github.com/tranbathanhtung/react-fiber-implement",
//           description: "re-implement react fiber",
//           language: "Javascript",
//           languageColor: "#f1e05a",
//           star: 508,
//           fork: 26
//         },
//       ],
//     },
//     // Dev Stack
//     articles: [
//       {
//         title: "How I learn code on internet and get my first job?",
//         htmlUrl: "",
//         description: "Published: Aug 19 '18",
//         reaction: 508,
//         comment: 508,
//       },
//     ],
//     // Contact Stack
//     contact: {
//       email: "tranbathanhtung222@gmail.com",
//       phone: "(+84) 937703222",
//       address: "Hà Nội, Việt Nam",
//     }
//   },
// };
