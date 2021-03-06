/**
 * 專案名稱： PubSub Tool
 * 部門代號： ML8100
 * 檔案說明： 抽象HTTP POST方法
 * @CREATE Fri Jan 08 2021 上午10:39:06
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { RequestCallback } from 'request';
import * as requestPromise from 'request-promise';
/**
 * 抽象HTTP POST方法
 */
export interface PostMethod {
    /**
     * 呼叫HTTP POST
     *
     * @method public
     * @param uri      呼叫位置
     * @param options  呼叫配置
     * @param callback 回呼函數
     * @return 回傳呼叫結果
     */
    post(uri: any, options?: requestPromise.RequestPromiseOptions, callback?: RequestCallback): requestPromise.RequestPromise<any>;
}
