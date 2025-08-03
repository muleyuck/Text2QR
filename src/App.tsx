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
    <div className="h-full w-80 bg-white p-4">
      <div className="flex flex-col items-center space-y-2">
        <h2 className="mb-4 w-36">
          <img src="/logo-light.svg" alt="Text2QR Logo Light" />
        </h2>
        <QRCodeCanvas
          value={selectedText}
          marginSize={4}
          size={256}
          level={"L"}
          imageSettings={{
            src: "/favicon.svg",
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
        <div className="font-semibold text-gray-600">SCAN ME!</div>
      </div>
    </div>
  )
}

export default App
