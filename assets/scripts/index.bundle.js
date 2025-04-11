document.addEventListener("DOMContentLoaded", () => {
    const textContent = document.querySelector("[data-text]");
    const originalText = textContent.textContent.trim();
    const words = originalText.split(/\s+/);

    textContent.innerHTML = "";

    const wordSpans = words.map(word => {
        const span = document.createElement("span");
        span.textContent = word;
        return span;
    });

    wordSpans.forEach(span => textContent.appendChild(span));

    /* функция переноса строк и проверки промежутков */
    function adjustGaps() {
        Array.from(textContent.children).forEach(child => {
            if (child.classList && child.classList.contains("gap")) {
                textContent.removeChild(child);
            }
        });

        for (let i = 0; i < wordSpans.length - 1; i++) {
            const currentWord = wordSpans[i];
            const nextWord = wordSpans[i + 1];


            const currentRect = currentWord.getBoundingClientRect();
            const nextRect = nextWord.getBoundingClientRect();

            /* если слова находятся на разных строках, добавляем gap */
            if (currentRect.bottom !== nextRect.bottom) {
                const gap = document.createElement("span");
                gap.classList.add("gap");
                textContent.insertBefore(gap, nextWord);
            }
        }

        const lastWord = wordSpans[wordSpans.length - 1];
        const containerRect = textContent.getBoundingClientRect();
        const lastWordRect = lastWord.getBoundingClientRect();

        if (lastWordRect.right < containerRect.right - 1) {
            const gap = document.createElement("span");
            gap.classList.add("gap");
            textContent.appendChild(gap);
        }
    }

    adjustGaps();
    window.addEventListener("resize", adjustGaps);
});