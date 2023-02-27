
/**
 * Module to show custom dialogs
 */
export const customDialog = (() => {
    const dialog = document.querySelector("#custom-dialog");

    /**
     * Function to reset the dialog
     */
    const resetDialog = () => {
        dialog.innerHTML = "";
    };

    /**
     * Function to handle confirm button click
     */
    const handleConfirmClick = () => {
        // Do something when the user confirms
        closeDialog();
    };

    /**
     * Function to handle cancel button click
     */
    const handleCancelClick = () => {
        // Do something when the user cancels
        closeDialog();
    };

    /**
     * Function to close the dialog
     */
    const closeDialog = () => {
        dialog.close();
        resetDialog();
    };

    /**
     * Function to show an alert dialog
     * 
     * @param {string} message 
     */
    const alert = (message) => {
        // Set the title
        dialog.innerHTML = `
        <p>${message}</p>
        <button id="confirm">OK</button>`;

        const confirmButton = dialog.querySelector("#confirm");

        confirmButton.addEventListener("click", handleConfirmClick);

        dialog.showModal();
    };

    /**
     * Function to show a confirm dialog
     * 
     * @param {string} message
     * @returns {Promise<boolean>}
     */
    const confirm = (message) => {
        return new Promise((resolve, reject) => {
            dialog.innerHTML = `
              <p>${message}</p>
              <button id="confirm">OK</button>
              <button id="cancel">Cancel</button>`;
        
            const confirmButton = dialog.querySelector("#confirm");
            const cancelButton = dialog.querySelector("#cancel");
        
            const handleConfirmClick = () => {
              resolve(true);
              dialog.close();
            };
            const handleCancelClick = () => {
              resolve(false);
              dialog.close();
            };
        
            confirmButton.addEventListener("click", handleConfirmClick);
            cancelButton.addEventListener("click", handleCancelClick);
        
            dialog.showModal();
          });
    };

    /**
     * Function to show a prompt dialog
     * 
     * @param {string} message 
     * @returns {Promise<string|null>} 
     */
    const prompt = (message) => {
        return new Promise((resolve, reject) => {
            dialog.innerHTML = `
                <p>${message}</p>
                <input type="text" id="prompt-input" />
                <button id="confirm">OK</button>
                <button id="cancel">Cancel</button>`;

            const confirmButton = dialog.querySelector("#confirm");
            const cancelButton = dialog.querySelector("#cancel");
            const promptInput = dialog.querySelector("#prompt-input");

            const handleConfirmClick = () => {
                resolve(promptInput.value);
                dialog.close();
            };

            const handleCancelClick = () => {
                resolve(null);
                dialog.close();
            };

            confirmButton.addEventListener("click", handleConfirmClick);
            cancelButton.addEventListener("click", handleCancelClick);

            dialog.showModal();
        });
    };

    // Export the public functions
    return {
        alert,
        confirm,
        prompt
    };
})();