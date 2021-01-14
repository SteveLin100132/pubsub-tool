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

import { ConsumerGroup, ConsumerGroupOptions } from 'kafka-node';
import { Subject } from 'rxjs';
import { Consumer, ConsumerResolveStrategy } from '../../consumer';

/**
 * kafka-node Consumer
 */
export class KafkaNodeConsumer<T> extends ConsumerGroup implements Consumer<T> {
  /**
   * 要訂閱的項目
   */
  public subject = new Subject<T | string | Buffer>();
  /**
   * 發生錯誤時的訂閱項目
   */
  public errors = new Subject<Error>();
  /**
   * 是否要分割Array
   */
  public splitArray = false;

  /**
   * @param options Consumer配置
   * @param topic   Consumer要訂閱的Topic
   */
  constructor(options: ConsumerGroupOptions, topic: string) {
    super(options, topic);
  }

  /**
   * 消費資料
   *
   * @method public
   * @param resolver 消費資料解析策略
   * @return 回傳物件本身
   */
  public consume(resolver?: ConsumerResolveStrategy): KafkaNodeConsumer<T> {
    this.on('message', async (message) => {
      const result = resolver
        ? await resolver.resolve<T>(message.value)
        : message.value;

      if (Array.isArray(result) && this.splitArray) {
        result.forEach((item) => this.subject.next(item));
      } else {
        this.subject.next(result);
      }
    });
    return this;
  }

  /**
   * 關閉
   *
   * @method public
   */
  public close(): void {
    super.close((error) => {
      if (error) {
        console.error(error);
      }
    });
  }
}
