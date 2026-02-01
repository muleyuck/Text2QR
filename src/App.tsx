import { QRCodeCanvas } from "qrcode.react"
import type React from "react"
import { useEffect, useState } from "react"
import { CHROME_MESSAGE_TYPE } from "@/constant"

const App: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    chrome.runtime.sendMessage({ type: CHROME_MESSAGE_TYPE }, (response) => {
      // 1. Opened via context menu
      if (response?.text) {
        setSelectedText(response.text)
        return
      }

      // 2. Opened via extension icon
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0]
        if (!activeTab?.id) {
          setError("No active tab found")
          return
        }

        chrome.tabs.sendMessage(activeTab.id, { type: CHROME_MESSAGE_TYPE }, (contentResponse) => {
          if (chrome.runtime.lastError) {
            setError("Cannot access this page")
          } else if (contentResponse?.text) {
            setSelectedText(contentResponse.text)
          } else {
            setError("No text selected")
          }
        })
      })
    })
  }, [])

  return (
    <div className="w-80 bg-white py-2">
      <div className="flex flex-col items-center space-y-2">
        <h2 className="w-48">
          <img src="/logo-light.svg" alt="Text2QR Logo Light" />
        </h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <QRCodeCanvas
              value={selectedText}
              marginSize={2}
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
            <div className="font-semibold text-gray-400">SCAN ME!</div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
