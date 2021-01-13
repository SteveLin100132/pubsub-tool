/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： 消費資料解析策略
 * @CREATE Thu Nov 26 2020 下午4:31:08
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 消費資料解析策略
 */
export interface ConsumerResolveStrategy {
  /**
   * 解析資料
   *
   * @method public
   * @param input 解析前的資料
   * @return 回傳解析後的資料
   */
  resolve(input: any): Promise<any>;
}
