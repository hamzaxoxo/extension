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
        let messageSpan = article.querySelector('div[data-ad-preview="message"] span');
        let imageDiv = article.querySelector('.x10l6tqk.x17qophe.x13vifvy.xh8yej3 .x1vvkbs');
        let r13e = article.querySelector('div[id=":r13e:"] span');
        let r1d6 = article.querySelector('div[id=":r1d6:"] span');
        let r1ge = article.querySelector('div[id=":r1ge:"] span');
        let r1h0 = article.querySelector('div[id=":r1h0:"] span');
        let r1kh = article.querySelector('div[id=":r1kh:"] span');
        let r1mc = article.querySelector('div[id=":r1mc:"] span');
        let r1sa = article.querySelector('div[id=":r1sa:"] span');
        let r20i = article.querySelector('div[id=":r20i:"] span');
        let r21h = article.querySelector('div[id=":r21h:"] span');
        let r222 = article.querySelector('div[id=":r222:"] span');
        let r29v = article.querySelector('div[id=":r29v:"] span');
        let r2al = article.querySelector('div[id=":r2al:"] span');
        let r2t7 = article.querySelector('div[id=":r2t7:"] span');
        let blockquote = article.querySelector('blockquote');


        let name = nameElement ? nameElement.innerText.trim() : "Unknown";
        let description = "";

        if (messageSpan) {
            description = messageSpan.innerText.trim();
        } else if (imageDiv) {
            description = imageDiv.innerText.trim();
        } else if (r13e) {
            description = r13e.innerText.trim();
        } else if (r1d6) {
            description = r1d6.innerText.trim();
        } else if (r1ge) {
            description = r1ge.innerText.trim();
        } else if (r1h0) {
            description = r1h0.innerText.trim();
        } else if (r1kh) {
            description = r1kh.innerText.trim();
        } else if (r1mc) {
            description = r1mc.innerText.trim();
        } else if (r1sa) {
            description = r1sa.innerText.trim();
        } else if (r20i) {
            description = r20i.innerText.trim();
        } else if (r21h) {
            description = r21h.innerText.trim();
        } else if (r222) {
            description = r222.innerText.trim();
        } else if (r29v) {
            description = r29v.innerText
        } else if (r2al) {
            description = r2al.innerText
        } else if (r2t7) {
            description = r2t7.innerText
        } else if (blockquote) {
            description = blockquote.innerText.trim();
        }

        if (description) {
            scrapedDataArr.push({
                name: name,
                post: description
            });
        }
    });

    console.log(scrapedDataArr, "scrapedDataArr");
}
