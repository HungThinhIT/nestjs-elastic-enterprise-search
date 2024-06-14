## Description

This package is based on official package: [@nestjs/elasticsearch](https://github.com/nestjs/elasticsearch)

Elasticsearch module for [Nest](https://github.com/nestjs/nest) based on the official [@elastic/enterprise-search](https://www.npmjs.com/package/@elastic/enterprise-search) package.

## Installation

```bash
$ npm i --save nest-elastic-enterprise-search
```

## Usage

Import `ElasticEnterpriseSearchModule`:

```typescript
@Module({
  imports: [ElasticEnterpriseSearchModule.register({
    url: 'http://localhost:9200',
  })],
  providers: [...],
})
export class SearchModule {}
```

Inject `ElasticEnterpriseService`:

```typescript
@Injectable()
export class SearchService {
  constructor(
    private readonly elasticEnterpriseService: ElasticEnterpriseService
  ) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
ElasticEnterpriseSearchModule.registerAsync({
  useFactory: () => ({
    url: 'http://localhost:9200'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
ElasticEnterpriseSearchModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    url: configService.get('ELASTICSEARCH_ENTERPRISE_URL'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
ElasticEnterpriseSearchModule.registerAsync({
  useClass: ElasticsearchConfigService
});
```

Above construction will instantiate `ElasticsearchConfigService` inside `ElasticEnterpriseSearchModule` and will leverage it to create options object.

```typescript
class ElasticEnterpriseSearchConfigService
  implements ElasticEnterpriseSearchOptionsFactory
{
  createElasticEnterpriseSearchOptions(): ElasticEnterpriseSearchModuleOptions {
    return {
      url: 'http://localhost:9200'
    };
  }
}
```

**3. Use existing**

```typescript
ElasticEnterpriseSearchModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `ElasticEnterpriseSearchModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `ElasticEnterpriseService` wraps the `Client` from the official [@elastic/enterprise-search](https://www.npmjs.com/package/@elastic/enterprise-search) methods. The `ElasticEnterpriseSearchModule.register()` takes `options` object as an argument, [read more](https://www.elastic.co/guide/en/enterprise-search-clients/enterprise-search-node/8.14/overview.html#quickstart-client).

## License

This package is under [MIT licensed](LICENSE).
