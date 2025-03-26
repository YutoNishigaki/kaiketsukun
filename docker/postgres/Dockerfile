FROM postgres:17.2

# 初期化スクリプトをコンテナにコピー
COPY init.sql /docker-entrypoint-initdb.d/

# ポートを開放
EXPOSE 5432
