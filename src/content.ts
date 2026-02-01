import { CHROME_MESSAGE_TYPE } from "@/constant"

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === CHROME_MESSAGE_TYPE) {
    const selectedText = window.getSelection()?.toString() || ""
    sendResponse({ text: selectedText })
  }
  return true
})
