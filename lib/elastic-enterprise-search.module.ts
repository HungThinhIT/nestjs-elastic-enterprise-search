import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ELASTIC_ENTERPRISE_SEARCH_MODULE_OPTIONS } from './elastic-enterprise-search.constants';
import { ElasticEnterpriseService } from './elastic-enterprise.service';
import {
  ElasticEnterpriseSearchModuleAsyncOptions,
  ElasticEnterpriseSearchModuleOptions,
  ElasticEnterpriseSearchOptionsFactory
} from './interfaces/elastic-enterprise-search-module-options.interface';

@Module({
  providers: [ElasticEnterpriseService],
  exports: [ElasticEnterpriseService]
})
export class ElasticEnterpriseSearchModule {
  static register(
    options: ElasticEnterpriseSearchModuleOptions
  ): DynamicModule {
    return {
      module: ElasticEnterpriseSearchModule,
      providers: [
        { provide: ELASTIC_ENTERPRISE_SEARCH_MODULE_OPTIONS, useValue: options }
      ]
    };
  }

  static registerAsync(
    options: ElasticEnterpriseSearchModuleAsyncOptions
  ): DynamicModule {
    return {
      module: ElasticEnterpriseSearchModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: ElasticEnterpriseSearchModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: <NonNullable<typeof options.useClass>>options.useClass,
        useClass: <NonNullable<typeof options.useClass>>options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: ElasticEnterpriseSearchModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: ELASTIC_ENTERPRISE_SEARCH_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: ELASTIC_ENTERPRISE_SEARCH_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: ElasticEnterpriseSearchOptionsFactory
      ) => await optionsFactory.createElasticEnterpriseSearchOptions(),
      inject: [
        options.useExisting ||
          <NonNullable<typeof options.useClass>>options.useClass
      ]
    };
  }
}
