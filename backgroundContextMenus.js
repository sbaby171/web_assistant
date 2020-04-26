// ContextMenus: 

function onClickHandler(info, tab) {
    if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
      console.log("radio item " + info.menuItemId +
                  " was clicked (previous checked state was "  +
                  info.wasChecked + ")");
    } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
      console.log(JSON.stringify(info));
      console.log("checkbox item " + info.menuItemId +
                  " was clicked, state is now: " + info.checked +
                  " (previous state was " + info.wasChecked + ")");
    } 
    else if (info.menuItemId == "selection-child1" || info.menuItemId == "selection-child2") {
      console.log("selection-child " + info.menuItemId);
      console.log(JSON.stringify(info));
    } 
    else if (info.menuItemId == "contextselection"){
      console.log("SELECTION")
      console.log("item " + info.menuItemId + " was clicked");
      console.log("info: " + JSON.stringify(info));
      console.log("tab: " + JSON.stringify(tab));




      var name = window.prompt("NOTE: ");
      console.log("Recieved the following note: " + name);

      // var selection = document.getSelection();
      // console.log("OBJECT: " + JSON.stringify(selection));
      // ^^^ NOTE: I believe this is illegal: 
      //   
      // ERROR :Cannot access contents of the page. Extension manifest must request permission to access the respective host. 


    }
    else {
      console.log("item " + info.menuItemId + " was clicked");
      console.log("info: " + JSON.stringify(info));
      console.log("tab: " + JSON.stringify(tab));
    }
  };

chrome.contextMenus.onClicked.addListener(onClickHandler);

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


    chrome.contextMenus.create({"title": "Test Selection-parent item", "id": "selection-parent","contexts":["selection"]});
    chrome.contextMenus.create({"title": "Child 1", "parentId": "selection-parent", "id": "selection-child1", "contexts":["selection"]});
    chrome.contextMenus.create({"title": "Child 2", "parentId": "selection-parent", "id": "selection-child2", "contexts":["selection"]});
    console.log("selection-parent selection-child1 selection-child2");


});


// TODO: use info.menuItemId value to distingush between context type ()

// Methods: 
// ========
//
// create: 
// 
//   objective: Creates a new context item. If an error orrcurs during 
//   creation, it may not be detected until the creation callback 
//   fires; details will be in chrome.runtime.lastError. 
//
//   syntax: chrome.contextMenus.create(object createProperties, function callback)
//
//   Parameters: object-createProperties: 
//     - ItemType : (optional) type : The type of menu item. Defaults to normal. 
//   
//     - string : (optional) id : The unique ID to assign to this item. Mandatory
//       for event pages. Cannot be the same as another ID for this extension. 
//    
//     - string : (optional) title : The text to display in the item; this is 
//       required unless type is separator. When the context is selection, use %s
//       within the string to show the selected text. For example, if this parameters
//       value is "Translate '%s' to Pig Latin" anf the user selects the word 'cool',
//       the context menu item for the selection is "Translate 'cool' to Pig Latin."
//
//     - boolean (optional) checked : The initial state of a check box or radio 
//       button: true for selected, false for unselected. Only one radio button can
//       selected at a time in a given group.
// 
//     - array of ContextType : (optional) contexts : List of contexts this menu item
//       will appear in. Defaults to ['page']. 
// 
//     - boolean (optional) visible : Since Chrome 62. Whether the item is visible in 
//       the menu. 
//
//     - function : (optional) onClicked : A function that is called back when the 
//       menu item is clicked. Event pages cannot use this; instead, they should 
//       register a listener for contextMenus.onClicked.
//

