
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

/*
function getAxieInfoMarket(id, sendResponse) {
    fetch("https://axieinfinity.com/graphql-server/graphql", {"headers":{"content-type":"application/json"},"body":"{\"operationName\":\"GetAxieDetail\",\"variables\":{\"axieId\":\"" + parseInt(id) + "\"},\"query\":\"query GetAxieDetail($axieId: ID!) {\\n  axie(axieId: $axieId) {\\n    ...AxieDetail\\n    __typename\\n  }\\n}\\n\\nfragment AxieDetail on Axie {\\n  id\\n  name\\n  genes\\n  owner\\n  birthDate\\n  bodyShape\\n  class\\n  sireId\\n  sireClass\\n  matronId\\n  matronClass\\n  stage\\n  title\\n  breedCount\\n  level\\n  figure {\\n    atlas\\n    model\\n    image\\n    __typename\\n  }\\n  parts {\\n    ...AxiePart\\n    __typename\\n  }\\n  stats {\\n    ...AxieStats\\n    __typename\\n  }\\n  auction {\\n    ...AxieAuction\\n    __typename\\n  }\\n  ownerProfile {\\n    name\\n    __typename\\n  }\\n  children {\\n    id\\n    name\\n    class\\n    image\\n    title\\n    stage\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxiePart on AxiePart {\\n  id\\n  name\\n  class\\n  type\\n  stage\\n  abilities {\\n    ...AxieCardAbility\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieCardAbility on AxieCardAbility {\\n  id\\n  name\\n  attack\\n  defense\\n  energy\\n  description\\n  backgroundUrl\\n  effectIconUrl\\n  __typename\\n}\\n\\nfragment AxieStats on AxieStats {\\n  hp\\n  speed\\n  skill\\n  morale\\n  __typename\\n}\\n\\nfragment AxieAuction on Auction {\\n  startingPrice\\n  endingPrice\\n  startingTimestamp\\n  endingTimestamp\\n  duration\\n  timeLeft\\n  currentPrice\\n  currentPriceUSD\\n  suggestedPrice\\n  seller\\n  listingIndex\\n  __typename\\n}\\n\"}","method":"POST"})
    .then(response => {
        response.json().then(result => {
            let axie = result.data.axie;
            //axie.pendingExp = axie.battleInfo.pendingExp;
            sendResponse(axie);
        });
    })
    .catch(error => {
        console.log(error);
    });
}
*/

function getAxieInfoMarket(id, sendResponse) {
  fetch("https://1s9wo04jw3.execute-api.us-east-1.amazonaws.com/prod/getaxies/" + parseInt(id), {"headers":{"content-type":"application/json"},"method":"GET"})
  	.then(response => {
        response.json().then(result => {
		    console.log("Axie service result: ", result);
			if (!result) {
			  throw "Bad axie service result.";
			}
            let axie = result;
            //axie.pendingExp = axie.battleInfo.pendingExp;
            sendResponse(axie);
        }).catch(error => {
		  console.log(error);
		  console.log("Trying again in one second...");
		  setTimeout(() => { getAxieInfoMarket(id, sendResponse); }, 1300);
		});
    })
    .catch(error => {
        console.log(error);
	    console.log("Trying again in one second...");
	  	setTimeout(() => { getAxieInfoMarket(id, sendResponse); }, 1300);
    });
}

function invalidateAxieInfoMarket(id, sendResponse) {
  fetch("https://1s9wo04jw3.execute-api.us-east-1.amazonaws.com/prod/invalidateaxie/" + parseInt(id), {"headers":{"content-type":"application/json"},"method":"GET"})
  	.then(response => {
        response.json().then(result => {
		    console.log("Axie service result: ", result);
			if (!result) {
			  throw "Bad axie service result.";
			}
            let axie = result;
            //axie.pendingExp = axie.battleInfo.pendingExp;
            sendResponse(axie);
        }).catch(error => {
		  console.log(error);
		  console.log("Trying again in one second...");
		  setTimeout(() => { invalidateAxieInfoMarket(id, sendResponse); }, 1300);
		});
    })
    .catch(error => {
        console.log(error);
	    console.log("Trying again in one second...");
	  	setTimeout(() => { invalidateAxieInfoMarket(id, sendResponse); }, 1300);
    });
}

function getAxieBriefList(address, page, sort, auctionType, criteria, sendResponse) {
    //Assume we are at 24 axies per page
    if (page < 1) page = 1;
    let from = (page - 1) * 24;
    let formattedAddress = address;
    if (formattedAddress != null) {
        formattedAddress = "\"" + address + "\"";
    }
    fetch("https://axieinfinity.com/graphql-server/graphql", {
        "headers": {"content-type": "application/json"},
        "body": "{\"operationName\":\"GetAxieBriefList\",\"variables\":{\"from\":" + from + ",\"size\":24,\"sort\":\"" + sort + "\",\"auctionType\":\"" + auctionType + "\",\"owner\":" + formattedAddress + ",\"criteria\":" + JSON.stringify(criteria) + "},\"query\":\"query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\\n    total\\n    results {\\n      ...AxieBrief\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment AxieBrief on Axie {\\n  id\\n  genes\\n  owner\\n  name\\n  stage\\n  class\\n  breedCount\\n  image\\n  title\\n  stats {\\n    ...AxieStats\\n    __typename\\n  }\\n  battleInfo {\\n    banned\\n    __typename\\n  }\\n  auction {\\n    currentPrice\\n    currentPriceUSD\\n    __typename\\n  }\\n  parts {\\n    id\\n    name\\n    class\\n    type\\n    specialGenes\\n    __typename\\n  }\\n  __typename\\n}\\nfragment AxieStats on AxieStats {\\n  hp\\n  speed\\n  skill\\n  morale\\n  __typename\\n}\\n\\n\"}",
        "method": "POST"
    })
    .then(response => {
        response.json().then(result => {
            let axies = result.data.axies.results;
            sendResponse(axies);
        });
    })
    .catch(error => {
        console.log(error);
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "getAxieInfoMarket") {
        getAxieInfoMarket(request.axieId, sendResponse);
        return true;
    }
    if (request.contentScriptQuery == "invalidateAxieInfoMarket") {
        invalidateAxieInfoMarket(request.axieId, sendResponse);
        return true;
    }
    if (request.contentScriptQuery == "getAxieBriefList") {
        getAxieBriefList(request.address, request.page, request.sort, request.auctionType, request.criteria, sendResponse);
        return true;
    }
});
