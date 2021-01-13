/**
 * 專案名稱： PubSub Tool Example
 * 部門代號： ML8100
 * 檔案說明： Confluent Kafka Consumer
 * @CREATE Wed Jan 13 2021 下午1:21:40
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ConsumerGroup } from 'kafka-node';
import { v4 as uuidv4 } from 'uuid';
import {
  ConfluentAvroStrategy,
  ConfluentMultiRegistry,
  ConfluentSubResolveStrategy,
} from '../lib';

/**
 * -----------------------------------------------------------------------------
 * Config
 * -----------------------------------------------------------------------------
 */

const kafkaHost = 'localhost:9193,localhost:9193,localhost:9193';
const topic = 'testing.topic';
const registryHost =
  'http://localhost:8585,http://localhost:8585,http://localhost:8585';

/**
 * -----------------------------------------------------------------------------
 * Kafka Consumer
 * -----------------------------------------------------------------------------
 */

const consumer = new ConsumerGroup(
  {
    kafkaHost,
    groupId: uuidv4(),
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    encoding: 'buffer',
    fromOffset: 'latest',
    outOfRangeOffset: 'earliest',
    sasl: {
      mechanism: 'plain',
      username: 'username',
      password: 'password',
    },
  },
  topic
);

/**
 * -----------------------------------------------------------------------------
 * Confluent Resolver
 * -----------------------------------------------------------------------------
 */

const schemaRegistry = new ConfluentMultiRegistry(registryHost);
const avro = new ConfluentAvroStrategy();
const resolver = new ConfluentSubResolveStrategy(schemaRegistry, avro);

/**
 * -----------------------------------------------------------------------------
 * Consume
 * -----------------------------------------------------------------------------
 */

consumer.on('message', async (msg) => {
  const result = await resolver.resolve(msg.value);
  console.log(result);
});
