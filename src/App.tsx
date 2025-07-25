import { generateQRCode } from "@/qrCode";
import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Background scriptから選択されたテキストを取得
    chrome.runtime.sendMessage({ type: "GET_SELECTED_TEXT" }, (response) => {
      if (response?.text) {
        setSelectedText(response.text);
        generateQRCodeFromText(response.text);
      } else {
        setError("選択されたテキストが見つかりません");
        setIsLoading(false);
      }
    });
  }, []);

  const generateQRCodeFromText = async (text: string) => {
    try {
      setIsLoading(true);
      const qrDataUrl = await generateQRCode(text);
      setQrCodeDataUrl(qrDataUrl);
    } catch {
      setError("QRコードの生成に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCodeDataUrl;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="w-80 h-60 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-80 p-4">
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 p-4 bg-white">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          QRコード生成
        </h2>

        {/* 選択されたテキスト表示 */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">選択されたテキスト:</p>
          <div className="bg-gray-100 p-2 rounded text-sm max-h-20 overflow-y-auto">
            {selectedText}
          </div>
        </div>

        {/* QRコード表示 */}
        {qrCodeDataUrl && (
          <div className="mb-4">
            <img
              src={qrCodeDataUrl}
              alt="QR Code"
              className="mx-auto border rounded"
            />
          </div>
        )}

        {/* ダウンロードボタン */}
        <button
          onClick={downloadQRCode}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          QRコードをダウンロード
        </button>
      </div>
    </div>
  );
};

export default App;
