document.getElementById('autoResetSetting').addEventListener('change', (event) => {
    chrome.storage.local.set({ autoResetSetting: event.target.checked });
});

chrome.storage.local.get("autoResetSetting", (data) => {
    document.getElementById('autoResetSetting').checked = data.autoResetSetting;
});