import React, { useState, useEffect } from "react";
import { Container, Title, Text, Loader, Alert } from "@mantine/core";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 初回マウント時にAPIからデータを取得
  useEffect(() => {
    fetch("http://localhost:3000/api/sample")
      .then(async (response) => {
        const { isSuccess, data, error } = await response.json();
        if (!isSuccess) {
          throw new Error(
            `HTTP error! status: ${response.status} error: ${error}`
          );
        }

        setMessage(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sample message:", err);
        setError("サンプルメッセージの取得に失敗しました。");
        setLoading(false);
      });
  }, []);

  return (
    <Container size="sm" style={{ marginTop: "2rem" }}>
      <Title order={2}>サンプルメッセージの表示</Title>
      {loading && <Loader size="lg" style={{ marginTop: "1rem" }} />}
      {error && (
        <Alert title="エラー" color="red" style={{ marginTop: "1rem" }}>
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Text size="lg" style={{ marginTop: "1rem" }}>
          {message}
        </Text>
      )}
    </Container>
  );
};

export default App;
