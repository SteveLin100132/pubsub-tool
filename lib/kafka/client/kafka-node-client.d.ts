/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： kafka-node客戶端
 * @CREATE Wed Jan 13 2021 下午12:50:38
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { KafkaClient, KafkaClientOptions } from 'kafka-node';
import { KafkaClientAdapter } from './kafka-client.adapter';
/**
 * kafka-node客戶端
 */
export declare class KafkaNodeClient extends KafkaClient implements KafkaClientAdapter {
    /**
     * @param options Kafka客戶端配置
     */
    constructor(options: KafkaClientOptions);
    /**
     * Kafka客戶端連線
     *
     * @method public
     */
    connect(): Promise<void>;
}
