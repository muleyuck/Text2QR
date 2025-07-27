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
    chrome.action.openPopup()
  }
})

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === CHROME_MESSAGE_TYPE) {
    sendResponse({ text: selectedText })
    selectedText = ""
  }
})
