
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
//assume web3 0.20.x is previously injected
const expCheckpointABI = [{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dailyExpLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"coreExtraContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"coreContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_coreContract","type":"address"},{"name":"_coreExtraContract","type":"address"},{"name":"_dailyExpLimit","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"},{"indexed":false,"name":"_exp","type":"uint256"}],"name":"ExpCheckpoint","type":"event"},{"anonymous":false,"inputs":[],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"constant":true,"inputs":[{"name":"_axieId","type":"uint256"}],"name":"getCheckpoint","outputs":[{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"},{"name":"_signature","type":"bytes"},{"name":"_subscriber","type":"address"},{"name":"_data","type":"bytes"}],"name":"checkpointAndCall","outputs":[{"name":"_axieExp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_axieIds","type":"uint256[]"},{"name":"_expList","type":"uint256[]"},{"name":"_createdAtList","type":"uint256[]"},{"name":"_signatures","type":"bytes"},{"name":"_subscriber","type":"address"},{"name":"_data","type":"bytes"}],"name":"checkpointForMultiAndCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"},{"name":"_signature","type":"bytes"}],"name":"checkpoint","outputs":[{"name":"_axieExp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_axieIds","type":"uint256[]"},{"name":"_expList","type":"uint256[]"},{"name":"_createdAtList","type":"uint256[]"},{"name":"_signatures","type":"bytes"}],"name":"checkpointForMulti","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dailyExpLimit","type":"uint256"}],"name":"setDailyExpLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const expCheckpointAddress = "0x71FfC95Ca3BcEbF26024f689F40006182916167f";
var web3query = null;
var expCheckpointContract;
var expCheckpointInstance;

function getCheckpoint(id, sendResponse) {
    if (window.Web3) {
        //console.log("found web3");
        web3query = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e9394133a3824a4d8ececb4384c3b1a2'));
        expCheckpointContract = web3query.eth.contract(expCheckpointABI);
        expCheckpointInstance = expCheckpointContract.at(expCheckpointAddress);
        expCheckpointInstance.getCheckpoint(id, (error, result) => {
            if (error) {
                console.log("Error getting Exp Checkpoint from the contract");
                return;
            }
            sendResponse({totalSynced: result[0].toNumber()});
        });
    } else {
        console.log("Web3 was not found");
        new Promise((resolve, reject) => {
            reject("Web3 was not found");
        });
    }
}
*/

function getAxieInfoMarket(id, sendResponse) {
    fetch("https://axieinfinity.com/graphql-server/graphql", {"headers":{"content-type":"application/json"},"body":"{\"operationName\":\"GetAxieDetail\",\"variables\":{\"axieId\":\"" + parseInt(id) + "\"},\"query\":\"query GetAxieDetail($axieId: ID!) {\\n  axie(axieId: $axieId) {\\n    ...AxieDetail\\n    __typename\\n  }\\n}\\n\\nfragment AxieDetail on Axie {\\n  id\\n  name\\n  genes\\n  owner\\n  birthDate\\n  bodyShape\\n  class\\n  sireId\\n  sireClass\\n  matronId\\n  matronClass\\n  stage\\n  title\\n  breedCount\\n  breedable\\n  exp\\n  level\\n  unlocked\\n  figure {\\n    atlas\\n    model\\n    image\\n    __typename\\n  }\\n  parts {\\n    ...AxiePart\\n    __typename\\n  }\\n  stats {\\n    ...AxieStats\\n    __typename\\n  }\\n  battleInfo {\\n    ...AxieBattleInfo\\n    __typename\\n  }\\n  auction {\\n    ...AxieAuction\\n    __typename\\n  }\\n  ownerProfile {\\n    name\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxiePart on AxiePart {\\n  id\\n  name\\n  class\\n  type\\n  mystic\\n  bionic\\n  xmas\\n  stage\\n  moves {\\n    ...AxieMove\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieMove on AxieMove {\\n  id\\n  name\\n  type\\n  attack\\n  defense\\n  accuracy\\n  stage\\n  effects {\\n    ...AxieMoveEffect\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieMoveEffect on AxieMoveEffect {\\n  name\\n  type\\n  description\\n  __typename\\n}\\n\\nfragment AxieStats on AxieStats {\\n  hp\\n  speed\\n  skill\\n  morale\\n  __typename\\n}\\n\\nfragment AxieBattleInfo on AxieBattleInfo {\\n  activityPoint\\n  pendingExp\\n  expSignature\\n  __typename\\n}\\n\\nfragment AxieAuction on Auction {\\n  startingPrice\\n  endingPrice\\n  startingTimestamp\\n  endingTimestamp\\n  duration\\n  timeLeft\\n  currentPrice\\n  currentPriceUSD\\n  suggestedPrice\\n  seller\\n  listingIndex\\n  auctionType\\n  __typename\\n}\\n\"}","method":"POST"})
    .then(response => {
        response.json().then(result => {
            let axie = result.data.axie;
            //axie.pendingExp = axie.battleInfo.pendingExp;
            sendResponse(axie);
        });
    });
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "getCheckpoint") {
        getCheckpoint(request.axieId, sendResponse);
        return true;
    }
    if (request.contentScriptQuery == "getAxieInfoMarket") {
        getAxieInfoMarket(request.axieId, sendResponse);
        return true;
    }

});