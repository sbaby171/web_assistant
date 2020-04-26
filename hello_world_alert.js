// JavaScript source code



// Content Scipts: 
// ===============
//   - Content Scripts can be 'programmatically' of 'declaratively' injected. 
//
//   Inject Programmatically: 
//   ------------------------
//     - Use programmatic injection for content scrips that need to run on 
//       specific occasions. 
//     - To inject a programmatic content script, provide the 'activeTab' 
//       permission in the manifest. This grants access to the active site's
//       host and temporary access to the 'tabs' permission, enabling the 
//       content sctip to run on the current tab without specifying 
//      'cross-origin permissions'. 
//   
//
//




chrome.runtime.onMessage.addListener(

    function hello_world_alert() {
        console.log("Hello World Alert!");
    }
);
