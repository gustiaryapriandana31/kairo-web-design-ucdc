import { AIUpdateTimeline, heroImageData } from '../data/data.js';
import { AIComponentData } from '../data/data.js';

// Handle Looping data on Hero Image
window.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = heroImageData.map(item => `
        <div class="p-5 text-white rounded-2xl bg-slate-700 hover:${item.hover} shadow-md">
            <h3 class="font-semibold text-center">${item.title}</h3>
            <p class="md:text-sm text-xs hidden md:block mt-3">${item.description}</p>
        </div>
    `).join('');
});

window.addEventListener("DOMContentLoaded", () => {
    const aiComponentContainer = document.getElementById("ai-components-container");
    aiComponentContainer.innerHTML = AIComponentData.map(item => `
        <div class="p-6 text-center transition bg-gray-700/80 hover:bg-gradient-to-br hover:from-blue-500 hover:to-emerald-600 shadow-md rounded-2xl hover:shadow-lg text-white text-sm">
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full">
                ${item.svg}
                <circle cx="12" cy="7" r="4" />
                </svg>
            </div>
            <h3 class="mb-2 text-xl font-semibold text-slate-100">${item.name}</h3>
            <p class="text-slate-200">${item.content}</p>
        </div>
    `).join('');
});

window.addEventListener("DOMContentLoaded", () => {
    const aiUpdateTimeline = document.getElementById("ai-update-timeline");
    const datePicker = document.getElementById("datePicker");
    const resetBtn = document.getElementById("resetBtn");

    function renderTimeline(data) {
        if (data.length === 0) {
            aiUpdateTimeline.innerHTML = `<p class="text-white text-center">Tidak ada update pada tanggal tersebut.</p>`;
            return;
        }
        aiUpdateTimeline.innerHTML = data.map((item, index) => {
            const isEven = index % 2 === 0;
            const sideClass = isEven ? "items-end text-end" : "items-start text-start";
            const alignClass = isEven ? "justify-start" : "justify-end";
            const beforeClass = isEven ? "before:right-[5.5px]" : "before:left-[5.5px]";
            return `
                <li class="relative flex md:${alignClass} md:${beforeClass} pb-6 items-center">
                    <div class="absolute md:left-1/2 md:-translate-x-1/2 h-full w-[2px] bg-gray-400"></div>
                    <div class="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            class="bi bi-circle-fill fill-${item.color}-400" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="8" />
                        </svg>
                    </div>
                    <div class="z-10 flex flex-col text-start md:${sideClass} md:max-w-[45%] ml-5">
                        <div class="p-4 rounded-lg shadow-lg ${item.bgcolor} text-white">
                            <p class="text-sm text-slate-200">${item.date}</p>
                            <p class="text-lg text-slate-200 font-semibold">${item.title}</p>
                            <p class="mt-2 text-sm text-slate-200">${item.description}</p>
                        </div>
                    </div>
                </li>`
        }).join('');
    }

    // Render awal semua data
    renderTimeline(AIUpdateTimeline);

    // Saat user memilih tanggal
    datePicker.addEventListener("change", () => {
        const selectedDate = datePicker.value;
        const filtered = AIUpdateTimeline.filter(item => item.date === selectedDate);
        renderTimeline(filtered);
    });

    // Tombol reset
    resetBtn.addEventListener("click", () => {
        datePicker.value = "";
        renderTimeline(AIUpdateTimeline);
    });
});

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');

toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// window.addEventListener("DOMContentLoaded", function () {
//     const currentPath = window.location.pathname.replace(/\/$/, ""); // Hilangkan slash terakhir
//     const links = document.querySelectorAll(".nav-link");

//     links.forEach(link => {
//         const linkPath = link.getAttribute("href").replace(/\/$/, "");

//         // Cek apakah path saat ini cocok dengan link
//         if (currentPath.endsWith(linkPath)) {
//             link.classList.add("text-emerald-400", "font-bold");
//         }
//     });
// });
