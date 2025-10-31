# SwiftCart 快速參考指南

## 🚀 快速開始

### 1 分鐘部署
```bash
# 1. Fork 專案到您的 GitHub
# 2. 設定 Secret: GEMINI_API_KEY
# 3. 啟用 GitHub Pages (Source: GitHub Actions)
# 4. 訪問: https://[您的用戶名].github.io/SwiftCart/
```

### 本地測試
```bash
# Clone 專案
git clone https://github.com/dong881/SwiftCart.git
cd SwiftCart

# 啟動伺服器
python3 -m http.server 8000

# 訪問
open http://localhost:8000
```

## 📁 專案檔案說明

| 檔案 | 說明 | 重要度 |
|------|------|--------|
| `index.html` | 主頁面 | ⭐⭐⭐ |
| `app.js` | 核心邏輯 + AI 整合 | ⭐⭐⭐ |
| `styles.css` | 樣式表 | ⭐⭐⭐ |
| `.github/workflows/deploy.yml` | 部署設定 | ⭐⭐⭐ |
| `README.md` | 專案說明 | ⭐⭐ |
| `SETUP_GUIDE.md` | 設定指南 | ⭐⭐ |
| `TESTING_GUIDE.md` | 測試指南 | ⭐ |
| `ARCHITECTURE.md` | 架構文檔 | ⭐ |

## 🔑 環境變數

### GitHub Secret 設定
```
Name: GEMINI_API_KEY
Value: 您的 Gemini API Key (AIzaSy...)
用途: AI 評論分析和評分
```

### 本地開發
```javascript
// app.js
const CONFIG = {
    GEMINI_API_KEY: 'YOUR_API_KEY_HERE'  // 本地測試用
};
```
**注意**: 不要提交包含真實 API Key 的程式碼！

## 🛠️ 常用命令

### Git 操作
```bash
# 查看狀態
git status

# 提交變更
git add .
git commit -m "描述您的變更"
git push origin main

# 更新專案
git pull origin main
```

### 測試
```bash
# 執行測試
node test.js

# 檢查 JavaScript 語法
node -c app.js

# 啟動本地伺服器
python3 -m http.server 8000
```

### GitHub Actions
```bash
# 觸發部署：推送到 main/master 分支
git push origin main

# 或使用 GitHub 網頁介面手動觸發
# Actions > Deploy to GitHub Pages > Run workflow
```

## 🎨 自定義指南

### 修改顏色主題
```css
/* styles.css */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #4caf50;
    --warning-color: #ff9800;
    --danger-color: #f44336;
}
```

### 新增購物平台
```javascript
// app.js - Step 1: 新增 Mock 資料
const MOCK_PRODUCTS = {
    // 現有平台...
    yourPlatform: [
        { id: 10, name: '商品名', price: 1000, rating: 4.5, reviews: 100, image: 'url' }
    ]
};

// app.js - Step 2: 修改搜尋邏輯
if (platforms.yourPlatform) {
    allProducts = allProducts.concat(
        MOCK_PRODUCTS.yourPlatform.map(p => ({
            ...p, 
            platform: 'yourplatform', 
            platformName: '您的平台'
        }))
    );
}
```

```html
<!-- index.html - Step 3: 新增 Checkbox -->
<label>
    <input type="checkbox" id="includeYourPlatform" checked> 您的平台
</label>
```

```css
/* styles.css - Step 4: 新增平台樣式 */
.platform-yourplatform {
    background: #your-color;
    color: white;
}
```

### 調整評分權重
```javascript
// app.js - performMockAnalysis 函數
const overallScore = Math.round(
    (priceScore * 0.3 +        // 價格權重 30%
     trustScore * 0.4 +        // 可信度權重 40%
     product.rating * 15 * 0.3) // 評分權重 30%
);
```

## 🐛 故障排除速查表

| 問題 | 可能原因 | 解決方案 |
|------|----------|----------|
| 網站無法訪問 | Pages 未啟用 | Settings > Pages > Source: GitHub Actions |
| AI 功能不運作 | API Key 錯誤 | 檢查 Secret 設定和名稱 |
| 部署失敗 | 權限不足 | 檢查 workflow 權限設定 |
| 樣式未載入 | 快取問題 | 清除瀏覽器快取 (Ctrl+Shift+R) |
| 搜尋無反應 | JavaScript 錯誤 | 開啟 Console (F12) 檢查錯誤 |

## 📊 效能優化建議

### 圖片優化
```javascript
// 使用壓縮過的圖片
image: 'https://cdn.example.com/product-thumb-200x200.jpg'

// 或使用 lazy loading
<img loading="lazy" src="...">
```

### API 呼叫優化
```javascript
// 加入快取機制
const cache = new Map();
const cacheKey = JSON.stringify(products);
if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
}
```

### 減少 DOM 操作
```javascript
// 使用 DocumentFragment
const fragment = document.createDocumentFragment();
products.forEach(product => {
    fragment.appendChild(createProductCard(product));
});
productList.appendChild(fragment);
```

## 🔒 安全檢查清單

- [ ] API Key 儲存在 GitHub Secrets
- [ ] 程式碼中無硬編碼的敏感資訊
- [ ] 使用 HTTPS
- [ ] 輸入驗證（防止 XSS）
- [ ] API 呼叫錯誤處理
- [ ] 定期更換 API Key
- [ ] 監控 API 使用量

## 📈 進階功能開發路線圖

### Phase 1: 核心功能（已完成）
- [x] 基本搜尋功能
- [x] 多平台整合
- [x] AI 評分系統
- [x] 響應式設計

### Phase 2: 使用者體驗增強
- [ ] 圖片搜尋
- [ ] 搜尋歷史
- [ ] 收藏功能
- [ ] 價格追蹤

### Phase 3: 真實整合
- [ ] 實際購物平台 API
- [ ] 使用者登入系統
- [ ] 真實下單功能
- [ ] 訂單追蹤

### Phase 4: 進階功能
- [ ] 價格走勢圖
- [ ] 商品比較表
- [ ] 自動化購買
- [ ] 庫存提醒

## 🔗 有用的連結

### 官方文檔
- [Google Gemini API](https://ai.google.dev/docs)
- [GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)

### 學習資源
- [HTML/CSS/JavaScript 教學](https://developer.mozilla.org/zh-TW/)
- [Git 教學](https://git-scm.com/book/zh-tw/v2)
- [Web 開發最佳實踐](https://web.dev/)

### 工具
- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Can I Use](https://caniuse.com/) - 檢查瀏覽器相容性
- [Placeholder.com](https://placeholder.com/) - 測試圖片

## 💡 小技巧

1. **快速測試 API Key**: 檢查 Console 是否有警告
2. **除錯技巧**: 使用 `console.log()` 追蹤資料流
3. **版本控制**: 經常 commit，寫清楚的 commit 訊息
4. **文檔更新**: 改動功能時記得更新 README
5. **測試優先**: 改動後立即測試，避免累積錯誤

## 📞 獲取幫助

遇到問題？
1. 查看 [SETUP_GUIDE.md](SETUP_GUIDE.md) 的故障排除章節
2. 查看 [GitHub Issues](https://github.com/dong881/SwiftCart/issues)
3. 開啟新的 Issue 描述您的問題
4. 查閱相關文檔和教學

---

**記住**: 編碼愉快，持續學習！ 💻✨
