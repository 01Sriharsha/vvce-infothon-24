import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  client: {
    url: process.env.CLIENT_URL,
  },
  api: {
    prefix: "/api/v1",
  },
  jwt: {
    secretkey: process.env.SECRET_KEY,
  },
  gemini: {
    api: {
      key: process.env.GEMINI_API_KEY,
    },
  },
};
