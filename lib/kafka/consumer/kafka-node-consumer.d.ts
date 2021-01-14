/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： kafka-node Consumer
 * @CREATE Thu Jan 14 2021 上午10:30:51
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/// <reference types="node" />
import { ConsumerGroup, ConsumerGroupOptions } from 'kafka-node';
import { Subject } from 'rxjs';
import { Consumer, ConsumerResolveStrategy } from '../../consumer';
/**
 * kafka-node Consumer
 */
export declare class KafkaNodeConsumer<T> extends ConsumerGroup implements Consumer<T> {
    /**
     * 要訂閱的項目
     */
    subject: Subject<string | Buffer | T>;
    /**
     * 發生錯誤時的訂閱項目
     */
    errors: Subject<Error>;
    /**
     * 是否要分割Array
     */
    splitArray: boolean;
    /**
     * @param options Consumer配置
     * @param topic   Consumer要訂閱的Topic
     */
    constructor(options: ConsumerGroupOptions, topic: string);
    /**
     * 消費資料
     *
     * @method public
     * @param resolver 消費資料解析策略
     * @return 回傳物件本身
     */
    consume(resolver?: ConsumerResolveStrategy): KafkaNodeConsumer<T>;
    /**
     * 關閉
     *
     * @method public
     */
    close(): void;
}
