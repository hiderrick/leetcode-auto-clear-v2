// Utility functions for debugging and future development

/**
 * Logs extension state to console for debugging
 */
function debugExtensionState() {
    chrome.storage.local.get("autoResetSetting", (data) => {
        console.log('Extension state:', {
            autoResetEnabled: data.autoResetSetting,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
    });
}

/**
 * Validates if the current page is a valid LeetCode problem page
 * @returns {boolean} True if it's a valid problem page
 */
function isValidLeetCodeProblem() {
    const url = window.location.href;
    const problemPattern = /leetcode\.com\/problems\/[^\/]+/;
    return problemPattern.test(url);
}

/**
 * Gets the current LeetCode problem ID from URL
 * @returns {string|null} Problem ID or null if not found
 */
function getCurrentProblemId() {
    const url = window.location.href;
    const match = url.match(/leetcode\.com\/problems\/[^\/]+/);
    return match ? match[0].split('/').pop() : null;
}

/**
 * Saves user preferences with validation
 * @param {Object} preferences - User preferences object
 */
function saveUserPreferences(preferences) {
    if (!preferences || typeof preferences !== 'object') {
        console.error('Invalid preferences object');
        return;
    }
    
    chrome.storage.local.set(preferences, () => {
        if (chrome.runtime.lastError) {
            console.error('Failed to save preferences:', chrome.runtime.lastError);
        }
    });
}

/**
 * Retrieves all stored extension data
 * @returns {Promise<Object>} All stored data
 */
function getAllStoredData() {
    return new Promise((resolve) => {
        chrome.storage.local.get(null, (data) => {
            resolve(data);
        });
    });
}

/**
 * Clears all extension data
 */
function clearAllExtensionData() {
    chrome.storage.local.clear(() => {
        console.log('All extension data cleared');
    });
}

/**
 * Checks if the extension has necessary permissions
 * @returns {Promise<boolean>} True if all permissions are granted
 */
function checkPermissions() {
    return new Promise((resolve) => {
        chrome.permissions.contains({
            permissions: ['storage', 'tabs']
        }, (result) => {
            resolve(result);
        });
    });
}

/**
 * Formats timestamp for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted timestamp
 */
function formatTimestamp(date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Validates extension configuration
 * @returns {boolean} True if configuration is valid
 */
function validateExtensionConfig() {
    const requiredElements = ['toggleSwitch', 'status'];
    return requiredElements.every(id => document.getElementById(id) !== null);
}