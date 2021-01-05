// ==UserScript==
// @name        JellyNeo - Create Quoted List
// @namespace   Violentmonkey Scripts
// @match       https://items.jellyneo.net/search/*
// @grant       none
// @version     1.0
// @author      aj9ms
// @description Script runs when on the JellyNeo search page when looking through a shop directory list of items.  
// It gets all results on a page IF the result is sorted by price descending and then prints out a quoted list (makes it easier to create restocking-data.json.)
// ==/UserScript==

// Run program
createList();

function createList() {
    // Only retrieve items if the sort direction in the results is sorted by price descending
    const items = $("ul.no-padding.small-block-grid-3.large-block-grid-5.word-wrap-break-word > li");
    const params = new URLSearchParams(window.location.search);
    if (items.length < 1 || !params.has('sort_dir') || params.get('sort_dir').toLowerCase() != 'desc') {
        return;
    }
  
    const quotedList = [];
    items.each((index, item) => {
        const itemName = item.children[2].textContent;
        quotedList.push(itemName);
    });
    console.log("QUOTED LIST: ");
    console.log(quotedList);
    console.log("END QUOTED LIST");
}

