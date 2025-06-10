import { AIProductData } from '../data/data.js';

// Data Seluruh Produk AI
window.addEventListener("DOMContentLoaded", () => {
    const aiProductContainer = document.getElementById("ai-products-container");
    const searchInputAIProduct =  document.querySelector("input[name='search']");

    const renderViewAIProducts = (AIProductData) => {
        
        aiProductContainer.innerHTML = AIProductData.map(item => {
            const maxLength = 120; // Batas karakter
            const shortDescription = item.AIDescription.length > maxLength
                ? item.AIDescription.slice(0, maxLength) + '...'
                : item.AIDescription;
            
            return` 
            <div class="relative rounded-xl mt-10 p-6 pt-16 text-sm text-center text-white transition shadow-md bg-gray-700/40 hover:bg-gradient-to-br hover:from-blue-500 hover:to-emerald-600 hover:shadow-lg group">
                <div class="absolute flex items-center justify-center w-24 h-24 mx-auto mb-4 -translate-x-1/2 rounded-full shadow-2xl shadow-emerald-600 lg:-top-10 md:-top-6 top-0 left-1/2 bg-slate-100  grayscale group-hover:grayscale-0">
                    <img src="${item.AIImage}" alt="${item.AIName}" class="w-20 h-20">
                </div>
                <h3 class="mt-16 mb-2 text-xl text-slate-100 font-bold">${item.AIName}</h3>
                <p class="text-slate-200">${shortDescription}</p>
                <a href="/view/detail-product.html?slug=${item.AISlug}"><button class="cursor-pointer py-2 mt-3 text-sm font-semibold px-7 bg-emerald-600 rounded-2xl">Lihat</button></a>
            </div>`;
        }).join('');
    }

    renderViewAIProducts(AIProductData);

    // Event untuk menangkap input pencarian
    searchInputAIProduct.addEventListener("input", (e) => {
        const term = searchInputAIProduct.value.toLowerCase();
        const filteredAIProducts = AIProductData.filter(item => 
            item.AIName.toLowerCase().includes(term) || 
            item.AIDescription.toLowerCase().includes(term)
        );
        renderViewAIProducts(filteredAIProducts);
    });
});

// Ambil slug dari URL query string
const getSlugFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug"); // contoh: ?slug=chatgpt -> "chatgpt"
};

// Render detail produk berdasarkan slug
window.addEventListener("DOMContentLoaded", () => {
    const slug = getSlugFromUrl();
    const item = AIProductData.find(item => item.AISlug === slug);

    // Looping untuk data Tipe AI 
    const tipeAI = item.AITipe.map(data => 
        `<li>🌟 ${data}</span></li>`
    )

    // Looping untuk data Keunggulan AI 
    const keunggulanAI = item.AIKeunggulan.map(data => 
        `<li>
            <h4>✅ ${data.keunggulan}</h4>
            <p>▪️ ${data.deskripsi}.</p>
        </li>
        `
    )

    // Looping untuk data Keunggulan AI 
    const teknologiAI = item.AITeknologi.map(data => 
        `<tr class="transition hover:bg-gray-700/50">
            <td class="md:px-6 px-2 md:py-4 py-1">${data.komponen}</td>
            <td class="md:px-6 px-2 md:py-4 py-1">${data.detail}</td>
        </tr>
        `
    )

    const container = document.getElementById("detail-ai-product-container");

    container.innerHTML = `
        <nav class="mb-10 text-xs text-blue-200 font-poppins font-normal">
            <ol class="flex font-medium">
                <li><a href="/" class="hover:text-emerald-500">Beranda</a></li>
                <li><span class="mx-1">-></span></li>
                <li><a href="/view/products.html" class="hover:text-emerald-500">Produk AI</a></li>
                <li><span class="mx-1">-></span></li>
                <li><a href="/view/detail-product.html?slug=${item.AISlug}" class="hover:text-emerald-500">${item.AIName}</a></li>
            </ol>
        </nav>
        <div class="text-center">
            <img src="${item.AIImage}" alt="${item.AIName}" class="w-32 h-32 p-2 mx-auto mb-6 rounded-full shadow-lg grayscale hover:grayscale-0 shadow-emerald-500">
            <h2 class="mb-8 text-5xl font-bold text-transparent font-poppins bg-gradient-to-r from-emerald-600 to-sky-400 bg-clip-text">${item.AIName}</h2>
        </div>
        <a href="${item.AILink}" target="_blank"><button class="block my-5 md:w-1/3 w-3/4 mx-auto lg:px-4 p-1 md:py-2 text-lg font-bold text-slate-400 hover:text-slate-200 bg-blue-950 border rounded-full border-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-emerald-600">Kunjungi ${item.AIName}</button></a>

        <article class="gap-6 md:flex-row md:flex mb-3">
            <div class="space-y-6 basis-1/2">
                <div class="p-5 border shadow border-slate-700 hover:border-none rounded-2xl hover:shadow-emerald-300">
                    <div class="text-white">
                        <p class="md:text-justify text-slate-200 text-md">${item.AIDescription}</p>
                        <p>
                        <h5 class="my-3 font-semibold text-white font-poppins">Tipe AI</h5>
                        <ul>
                            ${tipeAI.join('')}
                        </ul>
                    </div>
                </div>
                <div class="p-5 text-white border shadow border-slate-700 hover:border-none rounded-2xl hover:shadow-emerald-300">
                    <div>
                        <h4 class="my-5 text-2xl font-semibold text-white font-poppins">Keunggulan</h4>
                    </div>
                    <ul>
                        ${keunggulanAI.join('')}
                    </ul>
                </div>
            </div>
            <div class="lg:p-5 md:p-3 border shadow basis-1/2 border-slate-700 hover:border-none rounded-2xl hover:shadow-emerald-300">
                <div class="md:max-w-4xl md:px-4 px-px mx-auto">
                    <h4 class="my-5 md:text-2xl text-xl font-semibold text-white font-poppins">Teknologi yang digunakan</h4>
                    <div class="overflow-x-auto rounded-lg shadow-lg">
                        <table class="min-w-full overflow-hidden text-white bg-gray-800 rounded-lg">
                            <thead class="text-white bg-gradient-to-r from-emerald-500 to-blue-600">
                                <tr>
                                    <th class="px-6 py-4 text-sm font-semibold tracking-wider text-left">Komponen</th>
                                    <th class="px-6 py-4 text-sm font-semibold tracking-wider text-left">Detail</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-700">
                                ${teknologiAI.join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </article>
    `;
});

