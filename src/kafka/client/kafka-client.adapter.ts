/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： 抽象Kafka客戶端轉接器
 * @CREATE Wed Jan 13 2021 下午12:40:58
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 抽象Kafka客戶端轉接器
 */
export interface KafkaClientAdapter {
  /**
   * Kafka客戶端連線
   *
   * @method public
   */
  connect(): Promise<void>;
}
