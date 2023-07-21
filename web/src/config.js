const configs = {
  development: {
    // apiUrl: "http://127.0.0.1:1337/api/",
    apiUrl: "http://strapi:1337/api/",
    baseUrl: "http://127.0.0.1:1337",
  },
  production: {
    apiUrl: "http://strapi:1337/api/",
    baseUrl: "http://127.0.0.1:1337",
  },
}[process.env.NODE_ENV];

export default configs;
