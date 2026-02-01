import { CHROME_MESSAGE_TYPE } from "@/constant"

const CONTEXT_MENU_ID = "generateQR"
const POPUP_CONFIG = {
  url: chrome.runtime.getURL("index.html"),
  type: "popup" as const,
  width: 320,
  height: 440,
}

let selectedText = ""

// Create context menu on extension install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Generate QR Code",
    contexts: ["selection"],
  })
})

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText && tab?.id) {
    selectedText = info.selectionText
    chrome.windows.create(POPUP_CONFIG)
  }
})

// Handle message from popup (only for context menu case)
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type !== CHROME_MESSAGE_TYPE) {
    return
  }

  const text = selectedText
  selectedText = ""
  sendResponse({ text })
})
