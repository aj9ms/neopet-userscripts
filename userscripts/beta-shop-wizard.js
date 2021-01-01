// ==UserScript==
// @name        Beta Shop Wizard Repeat Searching
// @namespace   Violentmonkey Scripts
// @match       http://www.neopets.com/shops/wizard.phtml
// @grant       none
// @version     1.0
// @author      aj9ms
// @description Script runs when on the shop wizard page.  When using paste shortcut keys on the page (Ctrl+V), it will populate value in search box and search for you.  Changes dropdown from "Containing my phrase" to "Identical to."
// ==/UserScript==

// Run program
shopWizSearch();
document.addEventListener('paste', handlePaste);

function shopWizSearch() { 
    const dropdown = $('.wizard-filters > #criteria');

    // The search results page has the same URL - if we're on that, we should ignore this script.
    if (!dropdown) {
        return;
    }

    // Change dropdown to "Identical to"
    dropdown.val('exact');
}

function handlePaste (e) {
    // The search results page has the same URL - if we're on that, we should ignore this script.
    const wizard = $('#shopwizard');
    if (!wizard) {
        return;
    }

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    
    // Search
    wizard.val(pastedData);
    $('.button-search-white').click();
}