/**
 * @constant
 * @description ルーティングパスの定義
 */
export const ROUTING_PATHS = {
  root: "/",

  auth: {
    signin: "/auth/sign-in",
    signup: "/auth/sign-up",
  },
};

/**
 * @constant
 * @description 認証が必要なルーティングパスを文字列の配列で定義
 */
export const PROTECTED_PATHS = ["/sample1", "/sample2"];
