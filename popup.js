let scrapData = document.getElementById('scrap-data');

scrapData.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapeData
    });
});

function scrapeData() {
    let scrapedDataArr = [];

    let data = document.querySelectorAll('div[role="feed"] div[role="article"]');

    data.forEach(article => {
        let nameElement = article.querySelector('div.x1yztbdb strong');
        let time = article.querySelector('span[dir="ltr"] div span span span a');

        const contentElements = [
            article.querySelector('div[data-ad-preview="message"] span'),
            article.querySelector('.x10l6tqk.x17qophe.x13vifvy.xh8yej3 .x1vvkbs'),
            article.querySelector('div[id=":r13e:"] span'),
            article.querySelector('div[id=":r1d6:"] span'),
            article.querySelector('div[id=":r1ge:"] span'),
            article.querySelector('div[id=":r1h0:"] span'),
            article.querySelector('div[id=":r1kh:"] span'),
            article.querySelector('div[id=":r1mc:"] span'),
            article.querySelector('div[id=":r1sa:"] span'),
            article.querySelector('div[id=":r20i:"] span'),
            article.querySelector('div[id=":r21h:"] span'),
            article.querySelector('div[id=":r222:"] span'),
            article.querySelector('div[id=":r29v:"] span'),
            article.querySelector('div[id=":r2al:"] span'),
            article.querySelector('div[id=":r2t7:"] span'),
            article.querySelector('div[id=":r43l:"] span'),
            article.querySelector('div[id=":r3im:"] span'),
            article.querySelector('blockquote')
        ];

        let name = nameElement ? nameElement.innerText.trim() : "Unknown";
        let description = "";

        for (let element of contentElements) {
            if (element && element.innerText.trim()) {
                description = element.innerText.trim();
                break;
            }
        }

        if (description) {
            scrapedDataArr.push({
                name: name,
                post: description,
                time: time ? time.innerText : "Unknown"
            });
        }
    });

    console.log(scrapedDataArr, "scrapedDataArr");
}


