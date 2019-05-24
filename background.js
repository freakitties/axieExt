
chrome.runtime.onInstalled.addListener(function() {
    getOptions((response) => {
        if (Object.keys(response).length == 0) {
            resetOptions();
        }
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'axieinfinity.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        },
        ]);
    });
});


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log(details);
    if (details.url.startsWith("https://axieinfinity.com/land-api/profile/land/")) {
        let idx = details.url.lastIndexOf("/");
        let accountId = parseInt(details.url.slice(idx + 1));
        console.log("acctid: " + accountId);
        putOption("axieAccountId", accountId);
    }
  },
  {urls: ["https://axieinfinity.com/land-api/profile/land/*", "https://land.axieinfinity.com/inventory"]},
  ["requestBody"]
);
