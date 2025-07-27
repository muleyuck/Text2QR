import { CHROME_MESSAGE_TYPE } from "@/constant";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    chrome.runtime.sendMessage({ type: CHROME_MESSAGE_TYPE }, (response) => {
      if (response?.text) {
        setSelectedText(response.text);
      } else {
        setError("not found selected text");
      }
    });
  }, []);

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
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Text2QR</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Selection:</p>
          <div className="bg-gray-100 p-2 rounded text-sm max-h-20 max-w-full overflow-auto">
            {selectedText}
          </div>
        </div>
        <QRCodeCanvas
          value={selectedText}
          size={256}
          level={"L"}
          imageSettings={{
            src: "/vite.svg",
            x: undefined,
            y: undefined,
            height: 12,
            width: 12,
            excavate: true,
          }}
        />
      </div>
    </div>
  );
};

export default App;
