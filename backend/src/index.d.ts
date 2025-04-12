import "express";

declare global {
  namespace Express {
    interface Response {
      /**
       * 成功時のレスポンスメソッド
       * @param data 返却するデータ
       */
      success(data: any): this;

      /**
       * エラー時のレスポンスメソッド
       * @param error エラー内容
       * @param statusCode HTTPステータスコード
       */
      error(error: any, statusCode?: number): this;
    }
  }
}

export {};
