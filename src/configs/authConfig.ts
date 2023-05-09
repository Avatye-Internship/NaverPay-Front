// import * as dotenv from 'dotenv'

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.CLOUD_INSTANCE + process.env.TENANT_ID!,
    clientSecret: process.env.CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback(message: string) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: 'Info',
    },
  },
};

const { REDIRECT_URI } = process.env;
const { POST_LOGOUT_REDIRECT_URI } = process.env;
const GRAPH_ME_ENDPOINT = `${process.env.GRAPH_API_ENDPOINT}v1.0/me`;

export default {
  msalConfig,
  REDIRECT_URI,
  POST_LOGOUT_REDIRECT_URI,
  GRAPH_ME_ENDPOINT,
};
