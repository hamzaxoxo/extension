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
    let name = null;
    let post = null;

    let data = document.querySelectorAll('div[role="feed"]');

    data.forEach(parentDiv => {
        let nameDivs = parentDiv.querySelectorAll('div.x1yztbdb strong');
        let descDivs = parentDiv.querySelectorAll('div[role="article"]');

        nameDivs.forEach(nameDiv => {
            name = nameDiv.innerText;
        });

        descDivs.forEach(descDiv => {
            let description = "";

            let messageSpan = descDiv.querySelector('div[data-ad-preview="message"] span');
            let imageDiv = descDiv.querySelector('.x10l6tqk.x17qophe.x13vifvy.xh8yej3 .x1vvkbs');

            let sharedPost = descDiv.querySelector('div[role="article"] div[role="feed"]');

            if (messageSpan) {
                description = messageSpan.innerText.trim();
            } else if (imageDiv) {
                description = imageDiv.innerText.trim();
            }

            if (description) {
                post = description;
                scrapedDataArr.push({
                    // data: {
                    name: name,
                    post: post
                    // }
                });
            }

        });
    });

    console.log(scrapedDataArr, "scrapedDataArr");
}


