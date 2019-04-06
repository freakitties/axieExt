//assume web3 0.20.x is previously injected
const expCheckpointABI = [{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dailyExpLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"coreExtraContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"coreContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_coreContract","type":"address"},{"name":"_coreExtraContract","type":"address"},{"name":"_dailyExpLimit","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_axieId","type":"uint256"},{"indexed":false,"name":"_exp","type":"uint256"}],"name":"ExpCheckpoint","type":"event"},{"anonymous":false,"inputs":[],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"constant":true,"inputs":[{"name":"_axieId","type":"uint256"}],"name":"getCheckpoint","outputs":[{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"},{"name":"_signature","type":"bytes"},{"name":"_subscriber","type":"address"},{"name":"_data","type":"bytes"}],"name":"checkpointAndCall","outputs":[{"name":"_axieExp","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_axieIds","type":"uint256[]"},{"name":"_expList","type":"uint256[]"},{"name":"_createdAtList","type":"uint256[]"},{"name":"_signatures","type":"bytes"},{"name":"_subscriber","type":"address"},{"name":"_data","type":"bytes"}],"name":"checkpointForMultiAndCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_axieId","type":"uint256"},{"name":"_exp","type":"uint256"},{"name":"_createdAt","type":"uint256"},{"name":"_signature","type":"bytes"}],"name":"checkpoint","outputs":[{"name":"_axieExp","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_axieIds","type":"uint256[]"},{"name":"_expList","type":"uint256[]"},{"name":"_createdAtList","type":"uint256[]"},{"name":"_signatures","type":"bytes"}],"name":"checkpointForMulti","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_dailyExpLimit","type":"uint256"}],"name":"setDailyExpLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const expCheckpointAddress = "0x71FfC95Ca3BcEbF26024f689F40006182916167f";
var web3query = null;
var expCheckpointContract;
var expCheckpointInstance;
var observer;

const observerConfig = { attributes: false, childList: true, subtree: true };
const colorMap = {
    "plant": "rgb(108, 192, 0)",
    "reptile": "rgb(200, 138, 224)",
    "beast": "rgb(255, 184, 18)",
    "aquatic": "rgb(0, 184, 206)",
    "bird": "rgb(255, 139, 189)",
    "bug": "rgb(255, 83, 65)"
}
const classGeneMap = {"0000": "beast", "0001": "bug", "0010": "bird", "0011": "plant", "0100": "aquatic", "0101": "reptile", "1000": "???", "1001": "???", "1010": "???"};
const typeOrder = {"patternColor": 1, "eyes": 2, "mouth": 3, "ears": 4, "horn": 5, "back": 6, "tail": 7};
const geneColorMap = {"0000": {"0010": "ffec51","0011": "ffa12a","0100": "f0c66e", "0110": "60afce"},
"0001": {"0010": "ff7183", "0011": "ff6d61", "0100": "f74e4e",},
"0010": {"0010": "ff9ab8", "0011": "ffb4bb","0100": "ff778e"},
"0011": {"0010": "ccef5e", "0011": "efd636","0100": "c5ffd9"},
"0100": {"0010": "4cffdf", "0011": "2de8f2","0100": "759edb", "0110": "ff5a71"},
"0101": {"0010": "fdbcff", "0011": "ef93ff","0100": "f5e1ff", "0110": "43e27d"},
//nut hidden_1
"1000": {"0010": "D9D9D9", "0011": "D9D9D9","0100": "D9D9D9", "0110": "D9D9D9"},
//star hidden_2
"1001": {"0010": "D9D9D9", "0011": "D9D9D9","0100": "D9D9D9", "0110": "D9D9D9"},
//moon hidden_3
"1010": {"0010": "D9D9D9", "0011": "D9D9D9","0100": "D9D9D9", "0110": "D9D9D9"}};
const PROBABILITIES = {d: 0.375, r1: 0.09375, r2: 0.03125};
const parts = ["eyes", "mouth" ,"ears", "horn", "back", "tail"];
const MAX_QUALITY = 6 * (PROBABILITIES.d + PROBABILITIES.r1 + PROBABILITIES.r2);

var currentURL = window.location.href;
var axies = {};

async function init() {
    if (window.Web3) {
        //console.log("found web3");
        web3query = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e9394133a3824a4d8ececb4384c3b1a2'));
        expCheckpointContract = web3query.eth.contract(expCheckpointABI);
        expCheckpointInstance = expCheckpointContract.at(expCheckpointAddress);
    }

    await getBodyParts();

    let callback = function(mutationsList, observer) {
//console.log("list", mutationsList);
        if (window.location.href == currentURL && !window.location.href.includes("/axie/")) {
            return;
        }
//console.log("---");
        let rescan = false;
        let removed = false;
        let added = false;
        for(var mutation of mutationsList) {
            if (mutation.type == 'childList') {
//console.log(mutation);
                //kind of a hack. bug in website code reloads page with existing axies before loading new ones.
                if (mutation.removedNodes.length > 0) {
                    removed = true;
                } else if (mutation.addedNodes.length > 0) {    //separate if?
                    added = true;
                }
                if (added && removed) {
                    rescan = true;
                    break;
                }
            }
        }
        if (rescan) {
            if (window.location.href.includes("/axie/")) {
                //console.log("Axie Breeder module detected. Rescanning.");
                intID = setInterval(run, 1000);
            } else {
                console.log('New URI detected. Rescanning.');
                currentURL = window.location.href;
                intID = setInterval(run, 1000);
            }
        }

    };
    observer = new MutationObserver(callback);
}

var bodyPartsMap = {};
async function getBodyParts() {
    let parts = await fetch('https://axieinfinity.com/api/v2/body-parts').
        then(res => res.json()).
        catch(async (err) => {
            console.log("Failed to get body parts from the API");
            //API is unreliable. fall back to hard-coded local copy.
            let parts = await fetch(chrome.extension.getURL('body-parts.json')).then(res => res.json());
            for (let i in parts) {
                bodyPartsMap[parts[i].partId] = parts[i];
            }
        });
    for (let i in parts) {
        bodyPartsMap[parts[i].partId] = parts[i];
    }
}

function getQualityAndPureness(traits, cls) {
    let quality = 0;
    let dPureness = 0;
    for (let i in parts) {
        if (traits[parts[i]].d.class == cls) {
            quality += PROBABILITIES.d;
            dPureness++;
        }
        if (traits[parts[i]].r1.class == cls) {
            quality += PROBABILITIES.r1;
        }
        if (traits[parts[i]].r2.class == cls) {
            quality += PROBABILITIES.r2;
        }
    }
    return {quality: quality/MAX_QUALITY, pureness: dPureness};
}

function strMul(str, num) {
    var s = "";
    for (var i = 0; i < num; i++) {
        s += str;
    }
    return s;
}

function genesToBin(genes) {
    var genesString = genes.toString(2);
    genesString = strMul("0", 256 - genesString.length) + genesString
    return genesString;
}

const regionGeneMap = {"00000": "global", "00001": "japan"};
function getRegionFromGroup(group) {
    let regionBin = group.slice(8,13);
    if (regionBin in regionGeneMap) {
        return regionGeneMap[regionBin];
    }
    return "Unknown Region";
}

function getClassFromGroup(group) {
    let bin = group.slice(0, 4);
    if (!(bin in classGeneMap)) {
        return "Unknown Class";
    }
    return classGeneMap[bin];
}

function getPatternsFromGroup(group) {
    //patterns could be 6 bits. use 4 for now
    return {d: group.slice(2, 8), r1: group.slice(8, 14), r2: group.slice(14, 20)};
}

function getColor(bin, cls) {
    let color;
    if (bin == "0000") {
        color = "ffffff";
    } else if (bin == "0001") {
        color = "7a6767";
    } else {
        color = geneColorMap[cls][bin];
    }
    return color;
}

function getColorsFromGroup(group, cls) {
    return {d: getColor(group.slice(20, 24), cls), r1: getColor(group.slice(24, 28), cls), r2: getColor(group.slice(28, 32), cls)};
}

//hack. key: part name + " " + part type
var partsClassMap = {};
function getPartName(cls, part, region, binary, skinBinary="00") {
    let trait;
    if (binary in binarytraits[cls][part]) {
        if (skinBinary == "11") {
            trait = binarytraits[cls][part][binary]["mystic"];
        } else if (skinBinary == "10") {
            trait = binarytraits[cls][part][binary]["xmas"];
        } else if (region in binarytraits[cls][part][binary]) {
            trait = binarytraits[cls][part][binary][region];
        } else if ("global" in binarytraits[cls][part][binary]) {
            trait = binarytraits[cls][part][binary]["global"];
        } else {
            trait = "UNKNOWN Regional " + cls + " " + part;
        }
    } else {
        trait = "UNKNOWN " + cls + " " + part;
    }
    //return part + "-" + trait.toLowerCase().replace(/\s/g, "-");
    partsClassMap[trait + " " + part] = cls;
    return trait;
}

function getPartsFromGroup(part, group, region,) {
    let skinBinary = group.slice(0, 2);
    let mystic = skinBinary == "11";
    let dClass = classGeneMap[group.slice(2, 6)];
    let dBin = group.slice(6, 12);
    let dName = getPartName(dClass, part, region, dBin, skinBinary);

    let r1Class = classGeneMap[group.slice(12, 16)];
    let r1Bin = group.slice(16, 22);
    let r1Name = getPartName(r1Class, part, region, r1Bin);

    let r2Class = classGeneMap[group.slice(22, 26)];
    let r2Bin = group.slice(26, 32);
    let r2Name = getPartName(r2Class, part, region, r2Bin);

    return {d: getPartFromName(part, dName), r1: getPartFromName(part, r1Name), r2: getPartFromName(part, r2Name), mystic: mystic};
}

function getTraits(genes) {
    var groups = [genes.slice(0, 32), genes.slice(32, 64), genes.slice(64, 96), genes.slice(96, 128), genes.slice(128, 160), genes.slice(160, 192), genes.slice(192, 224), genes.slice(224, 256)];
    let cls = getClassFromGroup(groups[0]);
    let region = getRegionFromGroup(groups[0]);
    let pattern = getPatternsFromGroup(groups[1]);
    let color = getColorsFromGroup(groups[1], groups[0].slice(0, 4));
    let eyes = getPartsFromGroup("eyes", groups[2], region);
    let mouth = getPartsFromGroup("mouth", groups[3], region);
    let ears = getPartsFromGroup("ears", groups[4], region);
    let horn = getPartsFromGroup("horn", groups[5], region);
    let back = getPartsFromGroup("back", groups[6], region);
    let tail = getPartsFromGroup("tail", groups[7], region);
    return {cls: cls, region: region, pattern: pattern, color: color, eyes: eyes, mouth: mouth, ears: ears, horn: horn, back: back, tail: tail};
}

function getPartFromName(traitType, partName) {
    let traitId = traitType.toLowerCase() + "-" + partName.toLowerCase().replace(/\s/g, "-").replace(/[\?'\.]/g, "");
    return bodyPartsMap[traitId];
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
    if ("truePending" in axies[parseInt(axie.id)]) {
        return axies[axie.id];
    } else {
        axie.pendingExp = axie.pendingExp ? axie.pendingExp : 0;
        axie.totalSynced = await getCheckpoint(parseInt(axie.id));
        axie.truePending = axie.pendingExp - axie.totalSynced;
        return axie;
    }
}

async function getAxieInfo(id) {
    if (id in axies) {
        return axies[id];
    } else {
        var result_json = await fetch('https://api.axieinfinity.com/v1/axies/' + id).then(res => res.json());
        axies[id] = result_json;

        if (result_json.stage > 2) {
            axies[id].genes = genesToBin(BigInt(axies[id].genes));
            let traits = getTraits(axies[id].genes);
            let qp = getQualityAndPureness(traits, axies[id].class);
            axies[id].traits = traits;
            axies[id].quality = qp.quality;
            axies[id].pureness = qp.pureness;
        }
        return axies[id];
    }
}

function appendTrait(table, trait) {
    let row = document.createElement("tr");
    let mystic = trait["mystic"];
    for (let position in trait) {
        if (position == "mystic") continue;
        let data = document.createElement("td");
        let span = document.createElement("span");
        if (trait[position].hasOwnProperty("class")) {
            span.style.color = colorMap[trait[position].class];
        }
        span.textContent = trait[position].name;
        if (position == "d" && mystic) {
            span.textContent += "*";
        }
        data.appendChild(span);
        row.appendChild(data);
    }
    table.appendChild(row);

}

function genGenesDiv(axie, mouseOverNode, type="list") {
    let traits = document.createElement("div");
    let table = document.createElement("table");
    appendTrait(table, {d: {name: "D"}, r1: {name: "R1"}, r2: {name: "R2"}});
    appendTrait(table, axie.traits.eyes);
    appendTrait(table, axie.traits.ears);
    appendTrait(table, axie.traits.mouth);
    appendTrait(table, axie.traits.horn);
    appendTrait(table, axie.traits.back);
    appendTrait(table, axie.traits.tail);
    traits.appendChild(table);
    traits.style.display = "none";
    traits.style.position = "absolute";
    traits.style["z-index"] = "9999";
    traits.style.background = "white";
    traits.style.border = "grey";
    traits.style["border-style"] = "solid";
    traits.style["border-width"] = "1px";
    traits.style["border-radius"] = "20px";
    traits.style["white-space"] = "nowrap";
    traits.style["padding-left"] = "10px"
    traits.style["padding-top"] = "10px";
    traits.style["padding-bottom"] = "10px";
    traits.style["padding-right"] = "10px";
    traits.style.top = "-63px";
    if (type == "list") {
        if (axie.stage == 3) {
            traits.style.top = "-90px";
        }
        traits.style.left = "-18px";
    } else if (type == "details") {
        traits.style.left = "0px";
    }
    mouseOverNode.addEventListener("mouseover", function() {
        traits.style.display = "block";
    });
    mouseOverNode.addEventListener("mouseout", function() {
        traits.style.display = "none";
    });
    return traits;
}

var initObserver = true;
async function run() {
    let axieAnchors = document.querySelectorAll("a[href^='/axie/']");
//console.log(axieAnchors.length, intID);
    if (axieAnchors.length > 0 && intID != -1 && observer != null) {
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
            //if (breedButton && getComputedStyle(breedButton.parentNode.parentNode).backgroundColor != "rgb(203, 203, 203)") {
            if (breedButton) {
//console.log("observing breed button ", getComputedStyle(breedButton.parentNode.parentNode).backgroundColor, breedButton);
                //find the X button in the breeder window
                let xpath = "//svg:path[@d='M2 12L12 2M12 12L2 2']";
                let pathNode = document.evaluate(xpath, document, function(prefix) { if (prefix === 'svg') { return 'http://www.w3.org/2000/svg'; }}, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                let breedTarget = pathNode.parentNode.parentNode.parentNode.parentNode;
                observer.observe(breedTarget, observerConfig);
            } else {
//console.log("ignoring breed");
            }
        }
    }

    let onAxieDetailsPage = false;
    if (currentURL.startsWith("https://axieinfinity.com/axie/")) {
        let axieId = parseInt(currentURL.substring(currentURL.lastIndexOf("/") + 1));
        let axie = await getAxieInfo(axieId);
        if (axie.stage > 2) {
            let xpath = "(//svg:svg[@viewBox='681 3039 12 11'])[2]";
            let pathNode = document.evaluate(xpath, document, function(prefix) { if (prefix === 'svg') { return 'http://www.w3.org/2000/svg'; }}, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            let detailsNode =  pathNode.parentNode.parentNode.parentNode.parentNode;
            let traits = genGenesDiv(axie, detailsNode, "details");
            detailsNode.appendChild(traits);
        }
    }

    let dbg;
    try {
        for (let i = 0; i < axieAnchors.length; i++) {
            let anc = axieAnchors[i];
            let div = anc.firstElementChild;
            let axieId = parseInt(anc.href.substring(anc.href.lastIndexOf("/") + 1));
            getAxieInfo(axieId).then(axie => {

                if (axie.stage > 3) {
                    if (options[SHOW_PENDING_EXP_OPTION] && web3query) {
                        getTruePendingExp(axie).then(axie => {
                            if (!anc.firstElementChild.children[2].children[2].children[0].textContent.includes(" + ")) {
                                anc.firstElementChild.children[2].children[2].children[0].textContent += " + " + axie.truePending;
                            }
                        });
                    }
                }
                if (axie.stage > 2) {
                    if (options[SHOW_BREEDS_STATS_OPTION]) {
                        dbg = anc;
                        let content = document.createElement("div");
                        let statsDiv = document.createElement("div");
                        let stats = "H: " + axie.stats.hp + ", S: " + axie.stats.speed + ", M: " + axie.stats.morale + ", P: " + Math.round(axie.quality * 100) + "%";
                        if (axie.stage == 3) {
                            statsDiv.textContent = stats;
                            let extraDiv = document.createElement("div");
                            anc.firstElementChild.children[2].append(extraDiv);
                            //Hack. Hardcoded values taken from adult card. Will not dymanically update if AI change their styles.
                            content.style["font-size"] = "12px";
                            content.style["color"] = "rgb(96, 96, 96)";
                            content.style["padding"] = "2px 0px";
                            content.style["border-radius"] = "8px";

                        } else if (axie.stage > 3) {
                            statsDiv.textContent = "🍆: " + axie.breedCount + ", " + stats;
                            let cls = anc.firstElementChild.children[2].children[2].children[0];
                            if (cls) {
                                content.className = cls.classList[1];
                            }
                        }
                        //prevent
                        if ((anc.firstElementChild.children[2].children[2].childElementCount == 1 && axie.stage != 3) || (axie.stage == 3 && anc.firstElementChild.children[2].children[2].childElementCount == 0)) {
                            let traits = genGenesDiv(axie, statsDiv);
                            content.appendChild(statsDiv);
                            content.appendChild(traits);
                            anc.firstElementChild.children[2].children[2].append(content);
                            //remove part's box margin to prevent overlap with price
                            anc.firstElementChild.children[3].style["margin-top"] = "0px";

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
            }).catch((e) => {
                console.log("ERROR: " + e);
                console.log(e.stack);
            });
        }
    } catch (e) {
        console.log("ERROR: " + e);
        console.log(e.stack);
        console.log(dbg);
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
