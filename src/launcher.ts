import {checkIsWebview} from './browser';
import log from './log';

/**
 * 開啟視窗功能
 * mobile
 *  > ios safari      : 當有非同步發生時, 不可以接著 window.open, 會被 safari 認定不安全而錯誤
 *                      所以需要新開一個 about:black 視窗 (命名ID), 在導頁到目標ID。
 *  > android: chrome : 因配合 ios safari 的情況, 所以直接使用 ios safari 方案避免相同性問題。
 *
 * PS: 開啟的子視窗, 需注意跨域問題, 若開啟的網域與父視窗不同, 則無法再控制(包含覆蓋原本的視窗)
 *
 * @param prefixName     命名前輟ID名稱
 * @param isMultipleOpen 是否需要可以多開子視窗
 * @returns {boolean}
 */
export default class Launcher {
    _openTargetId: string;
    _isMultipleOpen: boolean = false;
    _isWebview: boolean = false;
    _targetWindow: any;
    _readyUrl?: string;

    constructor(prefixName: string, options: {isMultipleOpen: boolean, readyUrl: string}) {
        this._openTargetId = options.isMultipleOpen ? `${prefixName}_` : prefixName;
        this._isMultipleOpen = options.isMultipleOpen;
        this._targetWindow = null;
        this._isWebview = checkIsWebview();

    }

    /**
     * 準備開啟視窗的前置作業
     */
    ready(){
        if(!this._isWebview){
            const url = this._readyUrl ?? 'about:blank';
            this._targetWindow = window.open(url, this._openTargetId);
        }
    }

    /**
     * 開啟視窗
     * @param url 開啟目標的Url
     */
    open(url: string){
        if(this._isWebview){
            log.mobile(url);
            window.open(url);

        }else if(!this._isMultipleOpen && this._targetWindow){
            // 單一顯示模式中, 如果子視窗未關閉, 則使用子視窗導頁
            this._targetWindow.location.href = url;
        }else{
            window.open(url, this._openTargetId);
        }
    }

    /**
     * 關閉視窗
     */
    close() {
        this._targetWindow.close();
    }

}