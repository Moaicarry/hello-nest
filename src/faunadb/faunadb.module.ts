import { Global, Module, DynamicModule, ModuleMetadata } from '@nestjs/common';
import { ClientConfig } from 'faunadb';

import { FAUNADB_MODULE_OPTIONS } from './faunadb.constant';
import { FaunadbService } from './faunadb.service';

export type FaunadbModuleOptions = ClientConfig;

export interface FaunadbModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (
    ...args: any[]
  ) => Promise<FaunadbModuleOptions> | FaunadbModuleOptions;
  inject?: any[];
}

@Global()
@Module({
  providers: [FaunadbService],
  exports: [FaunadbService],
})
export class FaunadbModule {
  static forRoot(options: FaunadbModuleOptions): DynamicModule {
    const faunadbModuleOptions = {
      provide: FAUNADB_MODULE_OPTIONS,
      useValue: options,
    };

    return {
      module: FaunadbModule,
      providers: [faunadbModuleOptions],
      exports: [FaunadbService],
    };
  }

  static forRootAsync(options: FaunadbModuleAsyncOptions): DynamicModule {
    const faunadbModuleOptions = {
      provide: FAUNADB_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: FaunadbModule,
      imports: options.imports,
      providers: [faunadbModuleOptions],
      exports: [FaunadbService],
    };
  }
}
