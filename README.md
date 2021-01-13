

PubSub Tool

# Install

```
npm i pubsub-tool --save
```

# Table of Contents

- [Feature](#Feature)
- [API](#API)
  - [ConfluentSubResolveStrategy](#ConfluentSubResolveStrategy): for kafka consumer
  - [ConfluentPubResolveStrategy](#ConfluentPubResolveStrategy): for kafka producer

# Feature

* Confluent Schema Registry and Avro Resolver

# API

## Confluent Schema Registry and Avro Resolver Usage

### ConfluentSubResolveStrategy

Parameter | Type | Description
-----|:-----:|-----:|
schemaRegistry | SchemaRegistry | Schema Registry
avroResolver | AvroResolveStrategy | Avro Resolve Strategy

[Full Example](http://localhost)

```typescript
import {
  ConfluentAvroStrategy,
  ConfluentMultiRegistry,
  ConfluentSubResolveStrategy,
} from 'pubsub-tool';

const registryHost = 'http://localhost:8585,http://localhost:8585,http://localhost:8585';

const schemaRegistry = new ConfluentMultiRegistry(registryHost);
const avro = new ConfluentAvroStrategy();
const resolver = new ConfluentSubResolveStrategy(schemaRegistry, avro);

const data = new Buffer();
resolver.resolve(data).then(val => console.log(val));
```

### ConfluentPubResolveStrategy

Parameter | Type | Description
-----|:-----:|-----:|
schemaRegistry | SchemaRegistry | Schema Registry
avroResolver | AvroResolveStrategy | Avro Resolve Strategy
destination | string | Pubish destination

[Full Example](http://localhost)

```typescript
import {
  ConfluentAvroStrategy,
  ConfluentMultiRegistry,
  ConfluentPubResolveStrategy,
} from 'pubsub-tool';

const registryHost = 'http://localhost:8585,http://localhost:8585,http://localhost:8585';
const topic = 'testing.topic'

const schemaRegistry = new ConfluentMultiRegistry(registryHost);
const avro = new ConfluentAvroStrategy();
const resolver = new ConfluentPubResolveStrategy(schemaRegistry, avro, topic);

const data = { name: 'name', age: 18 };
resolver.resolve(data).then(buf => console.log(buf));
```