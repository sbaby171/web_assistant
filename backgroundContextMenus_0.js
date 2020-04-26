// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
    console.log(typeof(info));
    console.log(typeof(tab));

    console.log("Beginning");
    if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
      console.log("radio item " + info.menuItemId +
                  " was clicked (previous checked state was "  +
                  info.wasChecked + ")");
    } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
      console.log(JSON.stringify(info));
      console.log("checkbox item " + info.menuItemId +
                  " was clicked, state is now: " + info.checked +
                  " (previous state was " + info.wasChecked + ")");
    } else {
      console.log("item " + info.menuItemId + " was clicked");
      console.log("info: " + JSON.stringify(info));
      console.log("tab: " + JSON.stringify(tab));
    }
  };

// ^^^ NOTE: I was able to see these images, but that was because I was looking at the 
//     wrong 'console' page. I needed ot go to the developer page and view the console 
//     log associated with the 'background_page.html'
  
chrome.contextMenus.onClicked.addListener(onClickHandler);
// ^^^ NOTE: It is a bit difficult to follow the details about how function calls and sig
//     work in JAvaScript and Goolge Chrom APIs. 
//
// Events: onClicked 
//         - Fired when a context menu item is clicked.
//         - chrome.contextMenus.onClicked.addListener(function callback)
//       
//
// NOTE: Because functions are objects in javascript, you can pass functions
// to other functions as variables. 
//
// NOTE: A callback function is a function passed into another function as an argument, 
// which is then invoked inside the outer funciton to complete some kind of
// rountine or action. 
//
//   - https://developer.mozilla.org/en-US/docs/Glossary/Callback_function 
//
// In the example above, it is clear that the arguments for the callback function
// MUST be handled by the caller. Thus, in this example, Google Chromes API, 
// 'chrome.contextMens.onClicked' is taking in the function 'onClickHandler' 
// and assiging the input arguements to the callback. 
//
// NOTE: Details about the addListener function and chrome.events
// "An event is an object that allows you to be notified when something interesting
// happens. Here is an example of using the 'chrome.alarms.onAlarm' event to be 
// notified whenever an alarm has elapsed."
// 
//   chrome.alarms.onAlarm.addListener(function(alarm) {
//     appendToLog(....);
//   });
// 
// "As the example shows, you register for notification using the 'addListener()'. 
// The argument to addListener() is always a function that you define to handle the
// event, but the parameters to the function depend on which event you're handling.
// Checking the documentation for alarms.onAlarm, you can see that the functions has 
// a single parameter: an alarms.Alarm object that has details about the elapsed alarm."
//
 
  
  // Set up context menu tree at install time.
  chrome.runtime.onInstalled.addListener(function() {
    // Create one test item for each context type.
    var contexts = ["page","selection","link","editable","image","video",
                    "audio"];
    for (var i = 0; i < contexts.length; i++) {
      var context = contexts[i];
      var title = "Test '" + context + "' menu item";
      var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
      console.log("'" + context + "' item:" + id);
    }


    // NOTE: These will default to context-page, becasue nothing is declared.
    // Create a parent item and two children.
    chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});
    chrome.contextMenus.create({"title": "Child 1", "parentId": "parent", "id": "child1"});
    chrome.contextMenus.create({"title": "Child 2", "parentId": "parent", "id": "child2"});
    console.log("parent child1 child2");
    // Create some radio items.
    chrome.contextMenus.create({"title": "Radio 1", "type": "radio","id": "radio1"});
    chrome.contextMenus.create({"title": "Radio 2", "type": "radio","id": "radio2"});
    console.log("radio1 radio2");
    // Create some checkbox items.
    chrome.contextMenus.create({"title": "Checkbox1", "type": "checkbox", "id": "checkbox1"});
    chrome.contextMenus.create({"title": "Checkbox2", "type": "checkbox", "id": "checkbox2"});
    console.log("checkbox1 checkbox2");
   
  });