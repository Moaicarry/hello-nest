import { Inject, Injectable, Logger } from '@nestjs/common';
import { Client } from 'faunadb';

import { FAUNADB_MODULE_OPTIONS } from './faunadb.constant';
import { FaunadbModuleOptions } from './faunadb.module';

@Injectable()
export class FaunadbService extends Logger {
  private readonly client: Client;

  constructor(
    @Inject(FAUNADB_MODULE_OPTIONS)
    private readonly options: FaunadbModuleOptions,
  ) {
    super();

    if (!(options && options.secret)) {
      return;
    }

    this.client = new Client(options);
  }

  getClient() {
    return this.client;
  }
}
