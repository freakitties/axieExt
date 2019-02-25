//assume web3 0.20.x is previously injected
const expCheckpointABI = [{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dailyExpLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"coreExtraContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"coreContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_coreContract","type":"address"},{"name":"_coreExtraContract","type":"address"},{"name":"_dailyExpLimit","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"},{"indexed":false,"name":"_exp","type":"uint256"}],"name":"ExpCheckpoint","type":"event"},{"anonymous":false,"inputs":[],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"constant":true,"inputs":[{"name":"_axieId","type":"uint256"}],"name":"getCheckpoint","outputs":[{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"},{"name":"_signature","type":"bytes"},{"name":"_subscriber","type":"address"},{"name":"_data","type":"bytes"}],"name":"checkpointAndCall","outputs":[{"name":"_axieExp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_axieIds","type":"uint256[]"},{"name":"_expList","type":"uint256[]"},{"name":"_createdAtList","type":"uint256[]"},{"name":"_signatures","type":"bytes"},{"name":"_subscriber","type":"address"},{"name":"_data","type":"bytes"}],"name":"checkpointForMultiAndCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"},{"name":"_signature","type":"bytes"}],"name":"checkpoint","outputs":[{"name":"_axieExp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_axieIds","type":"uint256[]"},{"name":"_expList","type":"uint256[]"},{"name":"_createdAtList","type":"uint256[]"},{"name":"_signatures","type":"bytes"}],"name":"checkpointForMulti","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dailyExpLimit","type":"uint256"}],"name":"setDailyExpLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const expCheckpointAddress = "0x71FfC95Ca3BcEbF26024f689F40006182916167f";
var web3query = null;
var expCheckpointContract;
var expCheckpointInstance;

var observer;
const observerConfig = { attributes: false, childList: true, subtree: true };
var currentURL = window.location.href;

function init() {
    if (window.Web3) {
        //console.log("found web3");
        web3query = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/mew'));
        expCheckpointContract = web3query.eth.contract(expCheckpointABI);
        expCheckpointInstance = expCheckpointContract.at(expCheckpointAddress);
    }

    let callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                if (window.location.href != currentURL) {
                    console.log('New URI detected. Rescanning.');
                    currentURL = window.location.href;
                    intID = setInterval(run, 1000);
                } else if (window.location.href.includes("/axie/")) {
                    //console.log("Axie Breeder module detected. Rescanning.");
                    intID = setInterval(run, 1000);
                }

            }
        }
    };
    observer = new MutationObserver(callback);
}

function checkStatus(res) {
    if (res.ok) {
        return res;
    } else {
        throw Exception("Failed to get axie details: " + res);
    }
}

//Promisify getCheckpoint
function getCheckpoint(id) {
    return new Promise((resolve, reject) => {
        expCheckpointInstance.getCheckpoint(id, (error, result) => {
            if (error) {
                console.log("Error getting Exp Checkpoint from the contract");
                reject("Error getting Exp Checkpoint from the contract");
                return;
            }
            resolve(result[0].toNumber());
        });
    });
}

async function getTruePendingExp(axie) {
    axie.pendingExp = axie.pendingExp ? axie.pendingExp : 0;
    axie.totalSynced = await getCheckpoint(parseInt(axie.id));
    axie.truePending = axie.pendingExp - axie.totalSynced;
    return axie;
}

async function getAxieInfo(id) {
    //var result_json = await fetch('https://axieinfinity.com/api/axies/' + id).then(res => res.json());
    var result_json = await fetch('https://api.axieinfinity.com/v1/axies/' + id).then(res => res.json());
    return result_json;
}

var initObserver = true;
async function run() {
    let axieAnchors = document.querySelectorAll("a[href^='/axie/']");
    if (axieAnchors.length > 0 && intID != -1) {
        clearInterval(intID);
        intID = -1;
    } else {
        return;
    }
//console.log("running");
    if (initObserver) {
        let targetNode = axieAnchors[0].parentElement;
        observer.observe(targetNode, observerConfig);
        initObserver = false;

        if (window.location.href.includes("/axie/")) {
            let breedButton = document.evaluate("//span[text()='Breed']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (breedButton) {
                //find the X button in the breeder window
                let xpath = "//svg:path[@d='M2 12L12 2M12 12L2 2']";
                let pathNode = document.evaluate(xpath, document, function(prefix) { if (prefix === 'svg') { return 'http://www.w3.org/2000/svg'; }}, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                let breedTarget = pathNode.parentNode.parentNode.parentNode.parentNode;
                console.log("observing ", breedTarget);
                observer.observe(breedTarget, observerConfig);
            }
        }
    }

    try {
        for (let i = 0; i < axieAnchors.length; i++) {
            let anc = axieAnchors[i];
            let div = anc.firstElementChild;
            let axieId = parseInt(anc.href.substring(anc.href.lastIndexOf("/") + 1));
            let axie = await getAxieInfo(axieId);
            if (axie.stage == 4) {
                if (options[SHOW_PENDING_EXP_OPTION] && web3query) {
                    await getTruePendingExp(axie);
                    if (!anc.firstElementChild.children[2].children[2].children[0].textContent.includes(" + ")) {
                        anc.firstElementChild.children[2].children[2].children[0].textContent += " + " + axie.truePending;
                    }
                }
                if (options[SHOW_BREEDS_STATS_OPTION]) {
                    let content = document.createElement("div");
                    content.textContent = "🍆: " + axie.breedCount + ", H: " + axie.stats.hp + ", S: " + axie.stats.speed + ", M: " + axie.stats.morale;
                    let cls = anc.firstElementChild.children[2].children[2].children[0];
                    if (cls) {
                        content.className = cls.classList[1];
                    }
                    if (anc.firstElementChild.children[2].children[2].childElementCount == 1) {
                        anc.firstElementChild.children[2].children[2].append(content);
                        //reduce canvas size
                        let h = parseFloat(anc.firstElementChild.children[4].firstElementChild.children[1].style.height);
                        let w = parseFloat(anc.firstElementChild.children[4].firstElementChild.children[1].style.width);
                        anc.firstElementChild.children[4].firstElementChild.children[1].style.height = (h * 0.9).toFixed(2) + "px";
                        anc.firstElementChild.children[4].firstElementChild.children[1].style.width = (w * 0.9).toFixed(2) + "px";
                    }
                }
                /*
                if (options[REPLACE_ANIMATION_OPTION]) {
                    //replace animation with static image
                    let img = document.createElement("img");
                    img.src = axie.figure.static.idle;
                    img.width = "200";
                    anc.firstElementChild.children[4].firstElementChild.children[1].replaceWith(img);
                }
                */
            }
        }
    } catch (e) {
        console.log("ERROR: " + e);
        console.log(e.stack);
    }
}

var intID;
var options = {};
//currently, the extension will keep running if the page was previously loaded while enabled...need to reload page to disable inflight extension.
getOptions((response) => {
    options[ENABLE_OPTION] = response[ENABLE_OPTION];
    options[SHOW_PENDING_EXP_OPTION] = response[SHOW_PENDING_EXP_OPTION];
    options[SHOW_BREEDS_STATS_OPTION] = response[SHOW_BREEDS_STATS_OPTION];
    if (options[ENABLE_OPTION]) {
        init();
        //wait for page to load axies first
        intID = setInterval(run, 1000);
    }
});
