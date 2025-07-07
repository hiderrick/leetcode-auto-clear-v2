// gets dom elms
const toggleSwitch = document.getElementById('toggleSwitch');
const statusElement = document.getElementById('status');

// toggles 
toggleSwitch.addEventListener('click', () => {
    const isActive = toggleSwitch.classList.contains('active');
    const newState = !isActive;
    
    toggleSwitch.classList.toggle('active');
    chrome.storage.local.set({ autoResetSetting: newState });
    updateStatus(newState);
});

// loads init state
chrome.storage.local.get("autoResetSetting", (data) => {
    const isEnabled = data.autoResetSetting || false;
    
    if (isEnabled) {
        toggleSwitch.classList.add('active');
    }
    
    updateStatus(isEnabled);
});

// updates status
function updateStatus(isEnabled) {
    if (isEnabled) {
        statusElement.textContent = 'Auto reset is enabled';
        statusElement.classList.remove('inactive');
    } else {
        statusElement.textContent = 'Auto reset is disabled';
        statusElement.classList.add('inactive');
    }
}

// checks if on leetcode 
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentUrl = tabs[0].url;
    if (currentUrl && currentUrl.includes('leetcode.com')) {

    } else {
        statusElement.textContent = 'Navigate to LeetCode to use this extension';
        statusElement.classList.add('inactive');
    }
});