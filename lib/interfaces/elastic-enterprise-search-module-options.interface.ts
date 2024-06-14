import { ClientOptions } from '@elastic/enterprise-search';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type ElasticEnterpriseSearchModuleOptions = ClientOptions;

export interface ElasticEnterpriseSearchOptionsFactory {
  createElasticEnterpriseSearchOptions():
    | Promise<ElasticEnterpriseSearchModuleOptions>
    | ElasticEnterpriseSearchModuleOptions;
}

export interface ElasticEnterpriseSearchModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ElasticEnterpriseSearchOptionsFactory>;
  useClass?: Type<ElasticEnterpriseSearchOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) =>
    | Promise<ElasticEnterpriseSearchModuleOptions>
    | ElasticEnterpriseSearchModuleOptions;
  inject?: any[];
}
