const ENABLE_OPTION = "axieEx_enabled";
const MINIMAL_OPTION = "axieEx_minimal";
const SHOW_BREEDS_STATS_OPTION = "axieEx_breedsStats"

function putOption(key, value) {
    let persist = {};
    persist[key] = value;
    putOptions(persist);
    console.log("Persisting options...");
}

function putOptions(persist) {
    chrome.storage.sync.set(persist, function() {
    });
}

function getOptions(callback) {
    chrome.storage.sync.get([ENABLE_OPTION, MINIMAL_OPTION, SHOW_BREEDS_STATS_OPTION], callback);
}

function getOption(key, callback) {
    chrome.storage.sync.get([key], callback);
}

function resetOptions() {
    console.log("reset options");
    let defaultOptions = {};
    defaultOptions[ENABLE_OPTION] = true;
    defaultOptions[MINIMAL_OPTION] = false;
    defaultOptions[SHOW_BREEDS_STATS_OPTION] = true;
    putOptions(defaultOptions);
    return defaultOptions;
}
