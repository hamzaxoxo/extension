let scrapData = document.getElementById('scrap-data');
let resultDiv = document.getElementById('result');
let totalRecords = document.getElementById('total_records');
let loading = document.getElementById('loading');

scrapData.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: smoothScroll,
        args: [20, 1000]
    }, (injectionResults) => {
        if (injectionResults && injectionResults[0].result) {
            displayData(injectionResults[0].result);
        }
    });
});

function smoothScroll(durationInSeconds, delayInMs) {
    const stepSize = 1000;
    const totalSteps = durationInSeconds / (delayInMs / 1000);
    let currentStep = 0;

    function scrollStep() {
        if (currentStep < totalSteps) {
            window.scrollBy(0, stepSize);
            currentStep++;
            setTimeout(scrollStep, delayInMs);
        } else {
            console.log("scrolling done");
            scrapeData();
        }
    }

    scrollStep();

    const scrapeData = () => {
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
                article.querySelector('div[id=":rbh:"] span'),
                article.querySelector('div[id=":rda:"] span'),
                article.querySelector('div[id=":rht:"] span'),
                article.querySelector('div[id=":r4i:"] span'),
                article.querySelector('div[id=":r6b:"] span'),
                article.querySelector('div[id=":rau:"] span'),
                article.querySelector('div[id=":rm6:"] span'),
                article.querySelector('div[id=":rpe:"] span'),
                article.querySelector('div[id=":rqf:"] span'),
                article.querySelector('blockquote')
            ];

            let name = nameElement ? nameElement.innerText.trim() : "Unknown";
            let description = "";

            for (let element of contentElements) {
                // if (name === "صاصا محمد") {
                if (element && element.innerText.trim()) {
                    description = element.innerText.trim();
                    break;
                }
                // }
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
        return scrapedDataArr;
    }
}


function displayData(data) {
    resultDiv.innerHTML = '';

    data.forEach(item => {
        totalRecords.innerHTML = `
            <p><strong class="strong">Total Records:</strong> ${data.length}</p>
        `
        const entry = document.createElement('div');
        entry.innerHTML = `
            <p><strong class="strong">Name:</strong> ${item.name}</p>
            <p><strong class="strong">Post:</strong> ${item.post}</p>
            <p><strong class="strong">Time:</strong> ${item.time}</p>
            <hr />
        `;
        resultDiv.appendChild(entry);
    });
}
