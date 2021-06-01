import { Injectable } from '@nestjs/common';
import faunadb, { Collection, Get, Ref, Select } from 'faunadb';
import { FaunadbService } from '../faunadb';

@Injectable()
export class AppService {
  fql: faunadb.Client;

  constructor(private readonly faunadbService: FaunadbService) {
    this.fql = faunadbService.getClient();
  }

  async getCustomer(): Promise<string> {
    return this.fql.query(
      Select('data', Get(Ref(Collection('customers'), '101'))),
    );
  }
}
