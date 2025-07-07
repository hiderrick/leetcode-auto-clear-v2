/**
 * Clicks the reset button within the provided button container if it exists.
 * 
 * @param {HTMLElement} buttonContainer 
 * @returns {void}
 */
function clickResetButton(buttonContainer) {
    const buttons = buttonContainer.getElementsByTagName("button");
    const resetButton = buttons.length > 4 ? buttons[3] : null;
  
    if (resetButton) {
        resetButton.click();
        observeConfirmButton(buttonContainer);
    }
  }
  
  /**
  * Observes the editor for changes and clicks the confirm button when it appears.
  * 
  * @param {HTMLElement} buttonContainer - The container element that holds the buttons.
  * @returns {void}
  */
  function observeConfirmButton(buttonContainer) {
    const editor = document.getElementById("editor");
  
    if (!editor) {
        return;
    }
  
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const confirmButton = buttonContainer.querySelector('.text-label-r.bg-green-s');
                if (confirmButton) {
                    confirmButton.click();
                    observer.disconnect();
                    break;
                }
            }
        }
    });
  
    observer.observe(editor, { childList: true, subtree: true });
  }
  
  /**
  * Checks if the auto reset feature is enabled by retrieving the setting from local storage.
  * 
  * @returns {Promise<boolean>} A promise that resolves to true if auto reset is enabled, otherwise false.
  */
  function autoResetEnabled() {
    return new Promise((resolve) => {
        chrome.storage.local.get("autoResetSetting", (data) => {
            resolve(data.autoResetSetting);
        });
    });
  }
  
  /**
  * Observes the editor for changes and clicks the reset button when it appears.
  * 
  * @returns {void}
  */
  function observeEditor() {
    const editor = document.getElementById("editor");
  
    if (!editor) {
        return;
    }
  
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const sideButtonsContainer = editor.getElementsByClassName("flex items-center gap-1");
                const buttonContainer = sideButtonsContainer.length ? sideButtonsContainer[0] : null;
                if (buttonContainer) {
                    clickResetButton(buttonContainer);
                    observer.disconnect();
                    break;
                }
            }
        }
    });
  
    observer.observe(editor, { childList: true, subtree: true });
  }
  
  /**
  * Initializes the script by checking if auto reset is enabled and observing the editor.
  * 
  * @returns {void}
  */
  window.onload = async function () {
    if (await autoResetEnabled()) {
        observeEditor();
    }
  }
  