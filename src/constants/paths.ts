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

  dashboard: {
    root: "/dashboard",
  },

  stock: {
    root: "/stock",
    holding: "/stock/hold",
    dividendHistory: "/stock/div-history",
    tradeHistory: "/stock/trade-history",
  },

  account: {
    profile: "/account/profile",
  },
};

/**
 * @constant
 * @description 認証が必要なルーティングパスを文字列の配列で定義
 */
export const PROTECTED_PATHS = ["/dashboard", "/account", "/stock"];
