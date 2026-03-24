import { CHROME_MESSAGE_TYPE } from "@/constant"

const CONTEXT_MENU_ID = "generateQR"

let selectedText = ""

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: CONTEXT_MENU_ID,
      title: "Generate QR Code",
      contexts: ["selection"],
    })
  })

  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText && tab?.id) {
      selectedText = info.selectionText
      browser.windows.create({
        url: browser.runtime.getURL("popup.html"),
        type: "popup",
        width: 320,
        height: 440,
      })
    }
  })

  browser.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.type !== CHROME_MESSAGE_TYPE) {
      return
    }

    const text = selectedText
    selectedText = ""
    sendResponse({ text })
  })
})
