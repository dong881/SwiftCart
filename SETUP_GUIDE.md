# SwiftCart 部署指南

本文檔詳細說明如何將 SwiftCart 部署到 GitHub Pages，並啟用 Gemini AI 功能。

## 📋 前置需求

1. GitHub 帳號
2. Google 帳號（用於取得 Gemini API Key）
3. Git 基本操作知識

## 🚀 部署步驟

### 步驟 1: Fork 或 Clone 專案

#### 方法 A: Fork（推薦給新手）
1. 訪問 [SwiftCart GitHub 頁面](https://github.com/dong881/SwiftCart)
2. 點擊右上角的 "Fork" 按鈕
3. 選擇您的帳號作為目標

#### 方法 B: Clone 到本地
```bash
git clone https://github.com/dong881/SwiftCart.git
cd SwiftCart
```

### 步驟 2: 取得 Gemini API Key

1. **前往 Google AI Studio**
   - 訪問: https://makersuite.google.com/app/apikey
   - 使用您的 Google 帳號登入

2. **建立 API Key**
   - 點擊 "Create API Key" 或 "Get API Key"
   - 選擇現有專案或建立新專案
   - 系統會生成一個 API Key（格式類似：AIzaSy...）
   - **重要**: 複製並妥善保存此 Key，離開頁面後可能無法再次查看

3. **API 使用限制**
   - 免費方案有每日請求限制
   - 詳細資訊請查看: https://ai.google.dev/pricing

### 步驟 3: 設定 GitHub Secret

1. **前往您的 Repository 設定**
   - 在 GitHub 上開啟您的 SwiftCart repository
   - 點擊 `Settings` 標籤

2. **新增 Secret**
   - 在左側選單找到 `Secrets and variables` > `Actions`
   - 點擊 `New repository secret` 按鈕

3. **填寫 Secret 資訊**
   - Name: `GEMINI_API_KEY`（必須完全一致，區分大小寫）
   - Value: 貼上您在步驟 2 取得的 Gemini API Key
   - 點擊 `Add secret` 儲存

### 步驟 4: 啟用 GitHub Pages

1. **前往 Pages 設定**
   - 在 Repository 中點擊 `Settings`
   - 在左側選單找到 `Pages`

2. **設定 Source**
   - Build and deployment > Source: 選擇 `GitHub Actions`
   - 無需選擇分支，因為我們使用 GitHub Actions 自動部署

3. **儲存設定**
   - 設定會自動儲存

### 步驟 5: 觸發部署

1. **推送程式碼**（如果您是 Clone 到本地）
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **或使用 GitHub 網頁介面**
   - 對任何檔案進行小修改（如 README.md）
   - 在網頁上直接提交

3. **檢查部署狀態**
   - 前往 `Actions` 標籤
   - 您會看到 "Deploy to GitHub Pages" workflow 正在執行
   - 等待綠色勾選標記（通常需要 1-2 分鐘）

### 步驟 6: 訪問您的網站

1. **取得網址**
   - 格式: `https://[您的用戶名].github.io/SwiftCart/`
   - 例如: `https://dong881.github.io/SwiftCart/`

2. **或從 Settings > Pages 查看**
   - 部署成功後，會顯示 "Your site is live at ..."

## 🧪 測試

### 測試 AI 功能

1. 開啟瀏覽器的開發者工具（F12）
2. 查看 Console 標籤
3. 如果看到：
   - `⚠️ Gemini API key not configured` - API Key 未正確設定
   - 沒有警告訊息 - API Key 已正確設定

### 測試搜尋功能

1. 在搜尋框輸入商品名稱（例如："iPhone"）
2. 點擊搜尋按鈕
3. 應該會顯示 Top 5 推薦商品
4. 查看 AI 分析結果

## 🔧 故障排除

### 問題 1: 網站無法訪問
- **檢查**: Actions 是否成功執行
- **解決**: 前往 Actions 標籤，查看錯誤訊息
- **常見原因**: 
  - Branch 名稱不是 main 或 master
  - Pages 未啟用

### 問題 2: AI 功能不運作
- **檢查**: Console 是否顯示 API Key 錯誤
- **解決**: 
  1. 確認 Secret 名稱為 `GEMINI_API_KEY`（區分大小寫）
  2. 確認 API Key 有效且未過期
  3. 確認 API Key 有足夠的配額
  4. 重新推送程式碼觸發新的部署

### 問題 3: 部署失敗
- **檢查**: Actions 日誌
- **常見錯誤**:
  - `Permission denied`: 確認 workflow 有正確的權限設定
  - `API rate limit`: 等待一段時間後重試
  - `Invalid API key`: 檢查 Secret 設定

## 📝 自定義

### 修改商品資料

編輯 `app.js` 中的 `MOCK_PRODUCTS` 物件：

```javascript
const MOCK_PRODUCTS = {
    shopee: [
        { 
            id: 1, 
            name: '您的商品名稱', 
            price: 10000, 
            rating: 4.8, 
            reviews: 100, 
            image: 'https://example.com/image.jpg' 
        },
        // 更多商品...
    ],
    // 其他平台...
};
```

### 修改樣式

編輯 `styles.css` 來自定義：
- 顏色主題
- 字體
- 佈局
- 響應式斷點

### 新增平台

1. 在 `MOCK_PRODUCTS` 新增平台
2. 在 HTML 新增對應的 checkbox
3. 在搜尋邏輯中處理新平台

## 🔒 安全性注意事項

1. **絕不在程式碼中直接寫入 API Key**
2. **使用 GitHub Secrets 儲存敏感資訊**
3. **定期更換 API Key**
4. **監控 API 使用量**
5. **不要在公開的 issue 或 PR 中貼上 API Key**

## 💡 最佳實踐

1. **測試後部署**: 在本地測試功能後再推送
2. **版本控制**: 使用有意義的 commit 訊息
3. **文檔更新**: 修改功能時同步更新 README
4. **效能監控**: 定期檢查 API 使用量
5. **用戶回饋**: 收集使用者意見持續改進

## 🆘 需要協助？

- 開啟 [GitHub Issue](https://github.com/dong881/SwiftCart/issues)
- 查看 [GitHub Discussions](https://github.com/dong881/SwiftCart/discussions)
- 參考 [Google Gemini API 文檔](https://ai.google.dev/docs)

## 📚 相關資源

- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [GitHub Actions 文檔](https://docs.github.com/en/actions)
- [Gemini API 快速入門](https://ai.google.dev/tutorials/get_started_web)
- [Web Development 最佳實踐](https://web.dev/)

---

祝您部署順利！ 🎉
