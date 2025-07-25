// QRコード生成用のユーティリティ関数
// qrcode-generatorライブラリを使用してQRコードを生成

declare global {
  interface Window {
    qrcode: any;
  }
}

export const generateQRCode = async (text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // QRコードライブラリをロードする
      if (!window.qrcode) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js";
        script.onload = () => {
          createQRCode(text, resolve, reject);
        };
        script.onerror = () =>
          reject(new Error("QRコードライブラリの読み込みに失敗しました"));
        document.head.appendChild(script);
      } else {
        createQRCode(text, resolve, reject);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const createQRCode = (
  text: string,
  resolve: (value: string) => void,
  reject: (reason?: any) => void,
) => {
  try {
    const qr = window.qrcode(0, "M");
    qr.addData(text);
    qr.make();

    // SVGをCanvasに描画してDataURLを生成
    const size = 200;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Canvas context の取得に失敗しました"));
      return;
    }

    // 背景を白に設定
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);

    // QRコードを描画
    const moduleCount = qr.getModuleCount();
    const cellSize = size / moduleCount;

    ctx.fillStyle = "#000000";
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (qr.isDark(row, col)) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    const dataUrl = canvas.toDataURL("image/png");
    resolve(dataUrl);
  } catch (error) {
    reject(error);
  }
};
