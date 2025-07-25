let selectedText = "";

// コンテキストメニューの作成
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateQR",
    title: "QRコードを生成",
    contexts: ["selection"],
  });
});

// コンテキストメニューのクリック処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateQR" && info.selectionText && tab?.id) {
    selectedText = info.selectionText;
    // ポップアップを開く
    chrome.action.openPopup();
  }
});

// ポップアップからの選択テキスト取得リクエストを処理
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "GET_SELECTED_TEXT") {
    sendResponse({ text: selectedText });
    selectedText = ""; // 使用後にクリア
  }
});
