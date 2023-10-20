import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECERT: env.get('MAILER_SECERT').required().asString(),
  PROD: env.get('PROD').required().asBool(),
};
