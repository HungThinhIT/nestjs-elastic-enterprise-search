import { Client, ClientOptions } from '@elastic/enterprise-search';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { ELASTIC_ENTERPRISE_SEARCH_MODULE_OPTIONS } from './elastic-enterprise-search.constants';

@Injectable()
export class ElasticEnterpriseService extends Client {
  constructor(
    @Optional()
    @Inject(ELASTIC_ENTERPRISE_SEARCH_MODULE_OPTIONS)
    options: ClientOptions
  ) {
    super(options);
  }
}
