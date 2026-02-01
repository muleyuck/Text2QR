import { CHROME_MESSAGE_TYPE } from "@/constant"

let selectedText = ""
const contextMenuId = "generateQR"

// create context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: contextMenuId,
    title: "Generate QR Code",
    contexts: ["selection"],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === contextMenuId && info.selectionText && tab?.id) {
    selectedText = info.selectionText
    chrome.windows.create({
      url: chrome.runtime.getURL("index.html"),
      type: "popup",
      width: 320,
      height: 440,
    })
  }
})

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === CHROME_MESSAGE_TYPE) {
    sendResponse({ text: selectedText })
    selectedText = ""
  }
})
