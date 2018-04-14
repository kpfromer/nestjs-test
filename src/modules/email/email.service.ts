import * as Handlebars from 'handlebars';
import { markdown as Markdown } from 'nodemailer-markdown';
import * as Nodemailer from 'nodemailer';
import { Component } from '@nestjs/common';
import * as FileSystem from 'fs';
import { promisify } from 'util';
import * as Config from 'config';
import { merge } from 'lodash';

const readFile = promisify(FileSystem.readFile);

const templateCache = {};

const transport = Nodemailer.createTransport(Config.get('/nodemailer'));
transport.use('compile', Markdown({ useEmbeddedImages: true }));

@Component()
export class EmailService {
  private static async renderTemplate(signature, context) {
    if (templateCache[signature]) {
      return templateCache[signature](context);
    }

    const filePath = `${__dirname}/templates/${signature}.hbs.md`;
    const options = { encoding: 'utf-8' };

    const source = await readFile(filePath, options);

    templateCache[signature] = Handlebars.compile(source);
    return templateCache[signature](context);
  }

  async sendEmail(options, template, context) {

    const content = await EmailService.renderTemplate(template, context);

    options = merge(options, {
      from: Config.get('/emailVerification/fromAddress'),
      markdown: content
    });

    return await transport.sendMail(options);
  }
}
