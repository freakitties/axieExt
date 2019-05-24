function run() {
    clearInterval(intID);
    getOption("axieAccountId", (response) => {
        let accountId = response["axieAccountId"]
        console.log("retrieved: " + accountId);
        let xpath = "//body/div/div[3]";
        let node = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        let newDiv = document.createElement("div");
        newDiv.textContent = "Account ID: " + accountId;
        node.append(newDiv);
    });
}

var intID = setInterval(run, 1000);
