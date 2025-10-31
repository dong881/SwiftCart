// Configuration
const CONFIG = {
    // API key will be injected during build time by GitHub Actions
    GEMINI_API_KEY: 'GEMINI_API_KEY_PLACEHOLDER',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
};

// Mock product data for different platforms
const MOCK_PRODUCTS = {
    shopee: [
        { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 42900, rating: 4.8, reviews: 1250, image: 'https://via.placeholder.com/120?text=iPhone+15' },
        { id: 2, name: 'iPhone 15 Pro 128GB', price: 36900, rating: 4.7, reviews: 980, image: 'https://via.placeholder.com/120?text=iPhone+15' },
        { id: 3, name: 'iPhone 15 Plus 256GB', price: 32900, rating: 4.6, reviews: 850, image: 'https://via.placeholder.com/120?text=iPhone+15' }
    ],
    pchome: [
        { id: 4, name: 'iPhone 15 Pro Max 256GB 藍鈦金屬色', price: 43500, rating: 4.7, reviews: 680, image: 'https://via.placeholder.com/120?text=iPhone+15' },
        { id: 5, name: 'iPhone 15 Pro 128GB 鈦金屬', price: 36500, rating: 4.8, reviews: 920, image: 'https://via.placeholder.com/120?text=iPhone+15' },
        { id: 6, name: 'iPhone 15 256GB', price: 30900, rating: 4.5, reviews: 750, image: 'https://via.placeholder.com/120?text=iPhone+15' }
    ],
    momo: [
        { id: 7, name: 'iPhone 15 Pro Max 256GB 原廠保固', price: 42500, rating: 4.9, reviews: 1150, image: 'https://via.placeholder.com/120?text=iPhone+15' },
        { id: 8, name: 'iPhone 15 Pro 128GB 全新未拆', price: 36200, rating: 4.7, reviews: 890, image: 'https://via.placeholder.com/120?text=iPhone+15' },
        { id: 9, name: 'iPhone 15 128GB', price: 28900, rating: 4.6, reviews: 670, image: 'https://via.placeholder.com/120?text=iPhone+15' }
    ]
};

// Sample reviews for AI analysis
const SAMPLE_REVIEWS = [
    "商品品質很好，物流速度快，賣家服務態度佳，非常推薦！",
    "收到商品後發現有一點瑕疵，但賣家很快就處理了，整體還算滿意。",
    "物超所值！比想像中好用，推薦給大家～",
    "價格有點貴，但品質確實不錯，考慮很久才下單的。",
    "非常棒的購物體驗，商品跟描述一樣，包裝也很仔細。"
];

// Search products
async function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const error = document.getElementById('error');
    const productList = document.getElementById('productList');

    const query = searchInput.value.trim();
    
    if (!query) {
        showError('請輸入搜尋關鍵字');
        return;
    }

    // Get selected platforms
    const platforms = {
        shopee: document.getElementById('includeShoppe').checked,
        pchome: document.getElementById('includePchome').checked,
        momo: document.getElementById('includeMomo').checked
    };

    // Disable search button
    searchBtn.disabled = true;
    loading.classList.remove('hidden');
    results.classList.add('hidden');
    error.classList.add('hidden');

    try {
        // Gather products from selected platforms
        let allProducts = [];
        if (platforms.shopee) {
            allProducts = allProducts.concat(MOCK_PRODUCTS.shopee.map(p => ({...p, platform: 'shopee', platformName: '蝦皮'})));
        }
        if (platforms.pchome) {
            allProducts = allProducts.concat(MOCK_PRODUCTS.pchome.map(p => ({...p, platform: 'pchome', platformName: 'PChome'})));
        }
        if (platforms.momo) {
            allProducts = allProducts.concat(MOCK_PRODUCTS.momo.map(p => ({...p, platform: 'momo', platformName: 'Momo'})));
        }

        if (allProducts.length === 0) {
            showError('請至少選擇一個購物平台');
            return;
        }

        // Analyze products with AI
        const analyzedProducts = await analyzeProductsWithAI(allProducts, query);

        // Display top 5 results
        displayResults(analyzedProducts.slice(0, 5));

    } catch (err) {
        console.error('Search error:', err);
        showError('搜尋時發生錯誤，請稍後再試：' + err.message);
    } finally {
        searchBtn.disabled = false;
        loading.classList.add('hidden');
    }
}

// Analyze products with Gemini AI
async function analyzeProductsWithAI(products, query) {
    try {
        // Check if API key is configured
        if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === 'GEMINI_API_KEY_PLACEHOLDER') {
            console.warn('Gemini API key not configured, using mock analysis');
            return performMockAnalysis(products);
        }

        // Prepare prompt for Gemini
        const prompt = `你是一個專業的購物分析助手。請分析以下商品列表，針對搜尋關鍵字「${query}」，評估每個商品的：
1. 價格合理性 (0-100分)
2. 評論可信度 (0-100分)
3. 綜合推薦分數 (0-100分)

商品列表：
${products.map((p, i) => `${i+1}. ${p.platformName} - ${p.name} - $${p.price} - 評分${p.rating} (${p.reviews}則評論)`).join('\n')}

請以JSON格式回應，包含每個商品的分數和簡短評語。格式：
{
  "products": [
    {
      "index": 0,
      "priceScore": 85,
      "trustScore": 90,
      "overallScore": 88,
      "comment": "價格合理，評價可信度高"
    }
  ]
}`;

        const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Parse AI response
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const analysis = JSON.parse(jsonMatch[0]);
            
            // Merge analysis with products
            return products.map((product, index) => {
                const productAnalysis = analysis.products.find(p => p.index === index) || {
                    priceScore: 75,
                    trustScore: 75,
                    overallScore: 75,
                    comment: 'AI 分析中'
                };
                
                return {
                    ...product,
                    analysis: productAnalysis
                };
            }).sort((a, b) => b.analysis.overallScore - a.analysis.overallScore);
        }
    } catch (err) {
        console.error('AI analysis error:', err);
        console.warn('Falling back to mock analysis');
    }
    
    return performMockAnalysis(products);
}

// Perform mock analysis when AI is not available
function performMockAnalysis(products) {
    return products.map(product => {
        // Calculate scores based on rating and reviews
        const priceScore = Math.round(70 + Math.random() * 25);
        const trustScore = Math.round(product.rating * 18 + (product.reviews / 20));
        const overallScore = Math.round((priceScore + trustScore + product.rating * 15) / 3);
        
        return {
            ...product,
            analysis: {
                priceScore,
                trustScore,
                overallScore,
                comment: generateMockComment(priceScore, trustScore)
            }
        };
    }).sort((a, b) => b.analysis.overallScore - a.analysis.overallScore);
}

// Generate mock comment based on scores
function generateMockComment(priceScore, trustScore) {
    let comment = '';
    
    if (priceScore >= 85) {
        comment += '價格非常合理';
    } else if (priceScore >= 70) {
        comment += '價格合理';
    } else {
        comment += '價格偏高';
    }
    
    comment += '，';
    
    if (trustScore >= 85) {
        comment += '評價可信度高';
    } else if (trustScore >= 70) {
        comment += '評價可信度中等';
    } else {
        comment += '評價較少';
    }
    
    return comment;
}

// Display results
function displayResults(products) {
    const results = document.getElementById('results');
    const productList = document.getElementById('productList');
    
    productList.innerHTML = '';
    
    products.forEach((product, index) => {
        const card = createProductCard(product, index + 1);
        productList.appendChild(card);
    });
    
    results.classList.remove('hidden');
}

// Create product card
function createProductCard(product, rank) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const analysis = product.analysis;
    
    card.innerHTML = `
        <div class="product-rank">#${rank}</div>
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/120?text=No+Image'">
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <span class="product-platform platform-${product.platform}">${product.platformName}</span>
            <div class="product-price">NT$ ${product.price.toLocaleString()}</div>
            <div class="product-rating">
                <span class="stars">${'⭐'.repeat(Math.round(product.rating))}</span>
                <span>${product.rating} (${product.reviews} 則評論)</span>
            </div>
            <div class="product-analysis">
                <div class="analysis-item">
                    💰 價格合理性: <span class="score ${getScoreClass(analysis.priceScore)}">${analysis.priceScore}分</span>
                </div>
                <div class="analysis-item">
                    ✅ 評論可信度: <span class="score ${getScoreClass(analysis.trustScore)}">${analysis.trustScore}分</span>
                </div>
                <div class="analysis-item">
                    🎯 綜合評分: <span class="score ${getScoreClass(analysis.overallScore)}">${analysis.overallScore}分</span>
                </div>
                <div class="analysis-item" style="margin-top: 10px;">
                    💬 AI 評語: ${analysis.comment}
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="orderProduct('${product.platform}', ${product.id})">🛒 前往購買</button>
                <button class="btn btn-secondary" onclick="viewDetails('${product.platform}', ${product.id})">📝 查看詳情</button>
            </div>
        </div>
    `;
    
    return card;
}

// Get score class for color coding
function getScoreClass(score) {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
}

// Order product
function orderProduct(platform, productId) {
    const platformUrls = {
        shopee: 'https://shopee.tw',
        pchome: 'https://24h.pchome.com.tw',
        momo: 'https://www.momoshop.com.tw'
    };
    
    alert(`準備前往 ${platform.toUpperCase()} 購買商品...\n\n實際應用中，這裡會開啟購物平台連結或執行自動下單功能。`);
    
    // In a real application, this would open the product page
    // window.open(platformUrls[platform], '_blank');
}

// View product details
function viewDetails(platform, productId) {
    alert(`查看商品詳情功能\n\n平台: ${platform}\n商品ID: ${productId}\n\n實際應用中，這裡會顯示完整的商品資訊、所有評論分析等。`);
}

// Show error message
function showError(message) {
    const error = document.getElementById('error');
    error.textContent = message;
    error.classList.remove('hidden');
    
    setTimeout(() => {
        error.classList.add('hidden');
    }, 5000);
}

// Allow search on Enter key
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Show info if API key is not configured
    if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === 'GEMINI_API_KEY_PLACEHOLDER') {
        console.warn('⚠️ Gemini API key not configured. Using mock analysis mode.');
        console.info('To enable AI analysis, configure GEMINI_API_KEY in GitHub Secrets.');
    }
});
