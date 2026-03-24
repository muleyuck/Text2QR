import { CHROME_MESSAGE_TYPE } from "@/constant"

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    browser.runtime.onMessage.addListener((request, _sender, sendResponse) => {
      if (request.type === CHROME_MESSAGE_TYPE) {
        sendResponse({ text: window.getSelection()?.toString() ?? "" })
      }
      return true
    })
  },
})
