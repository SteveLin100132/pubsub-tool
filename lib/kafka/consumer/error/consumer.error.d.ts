/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： Consumer Error
 * @CREATE Thu Jan 14 2021 下午1:00:47
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * Consumer Error
 */
export declare class ConsumerError implements Error {
    /**
     * Error名稱
     */
    name: string;
    /**
     * Error訊息
     */
    message: string;
}
