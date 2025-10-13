import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { NodeEnv } from 'src/config/enums/node-env.enum';

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NodeEnv))
    .required(),
  PORT: Joi.number().required(),

  DATABASE_URL: Joi.string().required(),
  DIRECT_URL: Joi.string().required(),

  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASS: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),
  MAIL_FROM_NAME: Joi.string().default('No Reply'),

  PASSWORD_PEPPER: Joi.string().required(),
}).unknown(true);

@Injectable()
export class ConfigService {
  private readonly env: Record<string, any>;

  constructor() {
    const { value, error } = envSchema.validate(process.env, {
      convert: true,
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    this.env = value;
  }

  get NODE_ENV(): NodeEnv {
    return this.env.NODE_ENV as NodeEnv;
  }

  get PORT(): number {
    return this.env.PORT;
  }

  get DATABASE_URL(): string {
    return this.env.DATABASE_URL;
  }

  get DIRECT_URL(): string {
    return this.env.DIRECT_URL;
  }

  get MAIL_HOST(): string {
    return this.env.MAIL_HOST;
  }

  get MAIL_PORT(): number {
    return this.env.MAIL_PORT;
  }

  get MAIL_USER(): string {
    return this.env.MAIL_USER;
  }

  get MAIL_PASS(): string {
    return this.env.MAIL_PASS;
  }

  get MAIL_FROM(): string {
    return this.env.MAIL_FROM;
  }

  get MAIL_FROM_NAME(): string {
    return this.env.MAIL_FROM_NAME;
  }

  get PASSWORD_PEPPER(): string {
    return this.env.PASSWORD_PEPPER;
  }
}
