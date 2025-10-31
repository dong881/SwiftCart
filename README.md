# 🛒 SwiftCart

**智慧購物比價平台 - 整合蝦皮、PChome、Momo 的 AI 驅動購物助手**

[![Deploy to GitHub Pages](https://github.com/dong881/SwiftCart/actions/workflows/deploy.yml/badge.svg)](https://github.com/dong881/SwiftCart/actions/workflows/deploy.yml)

SwiftCart 是一個現代化的網頁應用程式，讓使用者能夠快速比較多個購物平台的商品，並透過 AI 技術分析價格合理性、評論可信度，自動篩選出最推薦的 Top 5 商品。

## ✨ 主要功能

- 🔄 **多平台整合**: 同時搜尋蝦皮、PChome、Momo 三大購物平台
- 💰 **AI 價格分析**: 使用 Google Gemini AI 分析價格合理性
- 🤖 **評論可信度辨識**: AI 智慧判斷商品評論的可信度
- ⭐ **智慧評分系統**: 綜合考量多項指標，推薦最佳商品
- 🎯 **Top 5 推薦**: 精準篩選並展示最值得購買的 5 個商品
- 📱 **響應式設計**: 支援桌面、平板、手機等各種裝置
- 🚀 **快速部署**: 自動部署到 GitHub Pages，無需伺服器

## 🚀 快速開始

### 線上體驗

直接訪問部署好的應用：[https://dong881.github.io/SwiftCart/](https://dong881.github.io/SwiftCart/)

### 本地運行

1. **Clone 專案**
```bash
git clone https://github.com/dong881/SwiftCart.git
cd SwiftCart
```

2. **使用瀏覽器開啟**
```bash
# 直接開啟 index.html 或使用本地伺服器
python -m http.server 8000
# 然後訪問 http://localhost:8000
```

## 🔧 設定 Gemini API

要啟用完整的 AI 分析功能，需要設定 Google Gemini API：

### 1. 取得 Gemini API Key

1. 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登入您的 Google 帳號
3. 點擊「Create API Key」
4. 複製生成的 API Key

### 2. 設定 GitHub Secret

1. 前往您的 GitHub 專案頁面
2. 點擊 `Settings` > `Secrets and variables` > `Actions`
3. 點擊 `New repository secret`
4. 名稱設為 `GEMINI_API_KEY`
5. 值貼上您的 API Key
6. 點擊 `Add secret`

### 3. 啟用 GitHub Pages

1. 前往 `Settings` > `Pages`
2. 在 `Source` 下選擇 `GitHub Actions`
3. 儲存設定

### 4. 觸發部署

推送程式碼到 `main` 或 `master` 分支，GitHub Actions 會自動：
- 注入 Gemini API Key
- 建置專案
- 部署到 GitHub Pages

## 📁 專案結構

```
SwiftCart/
├── index.html          # 主頁面
├── styles.css          # 樣式表
├── app.js             # 應用程式邏輯和 AI 整合
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Actions 部署配置
├── main.py            # 原始 Python 骨架（已整合到網頁版）
└── README.md          # 專案說明文件
```

## 🎨 功能展示

### 搜尋介面
- 簡潔的搜尋框，支援關鍵字搜尋
- 可選擇要搜尋的購物平台
- 即時顯示搜尋進度

### 商品展示
- Top 5 推薦商品卡片
- 顯示商品名稱、價格、評分
- AI 分析結果（價格合理性、評論可信度、綜合評分）
- 快速前往購買連結

### AI 分析指標
- 💰 **價格合理性**: 0-100 分，分析商品價格是否合理
- ✅ **評論可信度**: 0-100 分，判斷評論的真實性
- 🎯 **綜合評分**: 0-100 分，整體推薦度

## 🛠️ 技術棧

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **AI**: Google Gemini API
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📝 使用說明

1. **輸入搜尋關鍵字**: 在搜尋框中輸入您想要搜尋的商品名稱
2. **選擇購物平台**: 勾選您想要搜尋的平台（預設全選）
3. **點擊搜尋**: 點擊搜尋按鈕或按下 Enter
4. **查看結果**: 系統會顯示 AI 分析後的 Top 5 推薦商品
5. **前往購買**: 點擊「前往購買」按鈕查看商品詳情

## 🔒 隱私與安全

- API Key 透過 GitHub Secrets 安全儲存
- 在建置時注入，不會暴露在原始碼中
- 所有搜尋和分析都在客戶端進行
- 不收集或儲存使用者個人資料

## 🤝 貢獻指南

歡迎貢獻！如果您想改進 SwiftCart：

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📋 待開發功能

- [ ] 真實購物平台 API 整合
- [ ] 圖片搜尋功能
- [ ] 使用者登入系統
- [ ] 真正的一鍵下單功能
- [ ] 價格追蹤與提醒
- [ ] 歷史搜尋記錄
- [ ] 收藏商品功能
- [ ] 更多購物平台支援

## 📄 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 👨‍💻 開發者

**dong881**

## 🙏 致謝

- [Google Gemini AI](https://ai.google.dev/) - 提供強大的 AI 分析能力
- [GitHub Pages](https://pages.github.com/) - 免費託管服務
- [GitHub Actions](https://github.com/features/actions) - CI/CD 自動化

---

⭐ 如果這個專案對您有幫助，請給我們一個 Star！
