import { QRCodeCanvas } from "qrcode.react"
import type React from "react"
import { useEffect, useState } from "react"
import { CHROME_MESSAGE_TYPE } from "@/constant"

const App: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    chrome.runtime.sendMessage({ type: CHROME_MESSAGE_TYPE }, (response) => {
      if (response?.text) {
        setSelectedText(response.text)
      } else {
        setError("not found selected text")
      }
    })
  }, [])

  if (error) {
    return (
      <div className="w-80 p-4">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white p-4">
      <div className="text-center">
        <h2 className="mb-4 font-semibold text-gray-800 text-lg">Text2QR</h2>
        <div className="mb-4">
          <p className="mb-2 text-gray-600 text-sm">Selection:</p>
          <div className="max-h-20 max-w-full overflow-auto rounded bg-gray-100 p-2 text-sm">{selectedText}</div>
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
  )
}

export default App
