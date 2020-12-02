const ENABLE_OPTION = "axieEx_enabled";
const SHOW_BREEDS_STATS_OPTION = "axieEx_breedsStats"

function putOption(key, value) {
    let persist = {};
    persist[key] = value;
    putOptions(persist);
}

function putOptions(persist) {
    chrome.storage.sync.set(persist, function() {
    });
}

function getOptions(callback) {
    chrome.storage.sync.get([ENABLE_OPTION, SHOW_BREEDS_STATS_OPTION], callback);
}

function getOption(key, callback) {
    chrome.storage.sync.get([key], callback);
}

function resetOptions() {
    console.log("reset options");
    let defaultOptions = {};
    defaultOptions[ENABLE_OPTION] = true;
    defaultOptions[SHOW_BREEDS_STATS_OPTION] = true;
    putOptions(defaultOptions);
    return defaultOptions;
}