module.exports = {
    apps: [
      {
        name: "N-SCRAPPER",
        script: "server.js",
        watch: true,
        env: {
          PORT: 3008,
          JWT_SECRET: "dg34dvbe6723d43",
          DATABASE_URL:
            "mongodb+srv://admin:Q9wBhBS5XthKQNt@cluster0.md4rexm.mongodb.net/",
        },
      },
    ],
  };
  