let scrapData = document.getElementById('scrap-data');

scrapData.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapDataa
    });
});

function scrapDataa() {
    let scrapedDataArr = [];
    let data = document.querySelectorAll('div[role="feed"]');

    data.forEach(parentDiv => {
        let nameDivs = parentDiv.querySelectorAll('div.x1yztbdb');
        let descDivs = parentDiv.querySelectorAll(
            'div[dir="auto"]'
        );

        if (!nameDivs.length && !descDivs.length) {
            console.log('No data found');
        }

        nameDivs.forEach((nameDiv, index) => {
            let h2 = nameDiv.querySelector('h2');
            let desc = descDivs[index].querySelectorAll('span');

            if (h2 && desc) {
                let authorName = h2.innerText;
                let descText = desc.innerText

                if (authorName === "Rehan Khan" || authorName === "Dawood Ahmed") {
                    let dataObj = {
                        authorName: authorName,
                        desc: descText,
                    };
                    scrapedDataArr.push(dataObj);
                }
            }
        });
    });

    console.log(scrapedDataArr);
}
