// ==UserScript==
// @name        JellyNeo Searching
// @namespace   Violentmonkey Scripts
// @match       https://items.jellyneo.net/*
// @grant       none
// @version     1.0
// @author      aj9ms
// @description Script runs when on the JellyNeo search page.  When using paste shortcut keys on the page (Ctrl+V), it will populate value in search box and search for you.  Changes dropdown from "Partial" to "Exact."
// ==/UserScript==

// Run program
jellyNeoSearch();
document.addEventListener('paste', handlePaste);

function jellyNeoSearch() { 
    const dropdown = $("#search-name-type[name='name_type']");

    // If for some reason the dropdown doesn't exist, ignore this script.
    if (!dropdown) {
        return;
    }

    // Change dropdown to "Exact"
    dropdown.val('3');
}

function handlePaste (e) {
    const search = $("#search-name[name='name']");
    const url = window.location.href.split('/');
  
    // If for some reason the search textbox doesn't exist or we're on the search/item page, ignore this script.
    if (!search || (url.indexOf('search') == -1 && url.indexOf('item') == -1)) {
        return;
    }

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    
    // Search
    search.val(pastedData);
    $("input[type='submit'][value='Find']").click();
}