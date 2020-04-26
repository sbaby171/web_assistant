// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';





// Background Scripts: 
// ===================
//   Exentsions are event based programs used to modify or enhance the chrome
//   browsing experience. Events are browser triggers, such as navigating to a
//   new page, removing a bookmark, or closing a tab. Extensions monitor these 
//   events in their background script, then react with specified instructions. 
//

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url === undefined) {
        chrome.tabs.executeScript(tabId, { code: "console.log('REFRESH');" });


    }
});
// ^^^ NOTE: This function will be invoked whenever the page refreshs
// https://stackoverflow.com/questions/16949810/how-can-i-run-this-script-when-the-tab-reloads-chrome-extension
;



// chrome.contextMenus.onClicked.addListener(function() {

// });


// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//       "id": "sampleContextMenu",
//       "title": "Sample Context Menu",
//       "contexts": ["selection"]
//     });
//   });


chrome.runtime.onInstalled.addListener(function () {

 



    // chrome.storage: 
    // ---------------
    //   Use the chrome.storage API to store, retrieve, and track 
    //   changes to user data. 
    //
    // "One key difference between Chrome's storage API and the Web Storage API
    // is that Chrome offers a storage.synce mecahanism that allows user data to be 
    // automatically synced with Chrome sync. This would allow a user to 
    // access their data on a different device, assuming they have Chrome Sync 
    // enabled on their account.
    // 
    // SO when developing your extension, you will need to decide whether you want
    // to use `storage.local` or `storage.sync`. [...] storage.local offers about 5.2MB 
    // data while `storage.sync's` limit is aout 103KB. with maximum number of items stored 
    // 512. 
    // "
    // 
    //  - https://dev.to/milandhar/chrome-local-storage-in-extensions-4k9m

    chrome.storage.sync.set({ color: '##F3F3F3' }, function () {
        console.log("The color is IDK.");
    });



    //  chrome.declarativeContent
    //  -------------------------
    //    Use the chrome.declarativeContent API to take actions depending 
    //    on the content of a page, without requiring permission to read 
    //    the page's content. 
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});