-- kaiketsu スキーマを作成
CREATE SCHEMA kaiketsu;

-- スキーマの所有者を設定
ALTER SCHEMA kaiketsu OWNER TO postgres;

-- スキーマに対する権限を付与
GRANT USAGE ON SCHEMA kaiketsu TO postgres;
GRANT CREATE ON SCHEMA kaiketsu TO postgres;