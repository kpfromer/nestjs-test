import * as Confidence from 'confidence';

const constants = {
  APP_TITLE: 'Testing App',
  CLIENT_URL: 'https://testing.com',
  PORT: 3000,
  VERSION: 'v1',
  SWAGGER_LOCATION: 'swagger'
};

const config = {
  $meta: 'This file configures the appy API.',
  projectName: constants.APP_TITLE,
  websiteName: 'testing',
  clientURL: constants.CLIENT_URL,
  version: constants.VERSION,
  swaggerUrl: constants.SWAGGER_LOCATION,
  port: {
    $filter: 'env',
    production: process.env.PORT,
    $default: constants.PORT
  },
  // expirationPeriod: {
  //   short: '10m',
  //   medium: '30m',
  //   long: '4h'
  // },
  authAttempts: {
    forIp: 50,
    forIpAndUser: 7
  },
  lockOutPeriod: '30m',
  jwtSecret: {
    $filter: 'env',
    production: process.env.JWT_SECRET,
    $default: 'aStrongJwtSecret-#mgtfYK@QuRV8VMM7T>WfN4;^fMVr)y'
  },
  jwtExpire: {
    $filter: 'env',
    production: process.env.JWT_EXPIRE,
    $default: '30m'
  },
  saltNumber: {
    $filter: 'env',
    production: process.env.SALT_NUMBER,
    $default: 10
  },
  emailVerification: {
    fromAddress: {
      $filter: 'env',
      production: process.env.WEBSITE_EMAIL,
      $default: 'website@email.com'
    },
    emailTokenExpiration: {
      $filter: 'env',
      production: process.env.EMAIL_TOKEN_EXPIRATION,
      $default: '30m'
    },
  },
  nodemailer: {
    $filter: 'env',
    production: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'appyhapi@gmail.com',
        pass: process.env.SMTP_PASSWORD
      }
    },
    $default: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.DEV_EMAIL,
        pass: process.env.DEV_EMAIL_PASSWORD
      }
    }
  }
};
const criteria = {
  env: process.env.NODE_ENV
};

const store = new Confidence.Store(config);

export const get = (key: string) => store.get(key, criteria);
export const getMetadata = (key: string) => store.meta(key, criteria);
