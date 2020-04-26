'use strict';

// Unchecked runtime.lastError: Cannot access contents of the page. 
// Extension manifest must request permission to access the respective host. 


// After contents are written to the popup.html, how do i get them to stay?
//
// localStorage: 
// "The read-only localStorage property allows you to access a 'Storage' object 
// for the 'Document's' origin; the stored data is save across browser sessions. 
// localStorage is similiar to `sessionStorage`, except that while data stored in 
// `localStorage` has no expiration time, data stored in `sessionStorage` gets cleared
// when the page ends - that is, when the page is closed."
//
// N: From this, I would expected that I need the 'localStorage' to keep changes. As they 
//    say, the variables in the sessionStorage are cleared when the page session ends. In
//    other words, I would think that means with the popup html is closed.
// 
// *** Lol it does work.... I was just using the wrong sytnax for extracting the code. 
//     HOWEVER, a new issue seems to be afoot. The contents of popup html is not refreshing
//     the the activeTab is refreshed. {COULD the refreshing of the activeTab be a trigger
//     to reset the popup html}.
// 
// Q: If it is read-only, how do we write to it? 
//      - Perhaps they mean that once a variable is established it can never be changed.
//        Similiar to 'const' variables in C++. (the algorithm of new variable defintions).
//       
//        SIDE-BAR: I watched a video yesterday on 'how to think like a programmer' and it 
//        seemed to be targeted towards an audience of programming and computer science 
//        educators. Anyways, the presenter focus on the point that programming is not 
//        about langauge but rather data-structures and algorithms. I loved it. 
// 
//        His first example was the algortihm of 'new variable definition'. So simple 
//        and so fundamental. Through this simple, often overlooked, step in programming, 
//        a profound illustration of the importance of algorithms is displayed.
// 
//        ALGO: name of data, type of data, and initial value of data. 
//
//        Thus the simple, 'x = 0' is an algorithm in itself. Moreover, this algorithm,
//        in some languages like C++, can be enhanced ( or complicated depending who you ask)
//        with keywords. For instance, the keyword 'const' with add a constraint (or attribute
//        of feature) to the variable. In this case, the vairable is locked; its value can never
//        changed. 
//
//       
// 

// LOCAL-STORAGE
//var _results_ssi = localStorage.getItem("results-ssi");
//document.getElementById('results-ssi').innerHTML = _results_ssi;

// SESSION-STORAGE
var _results_ssi = sessionStorage.getItem("results-ssi");

if (_results_ssi == null) {
    document.getElementById('results-ssi').innerHTML = "NULL";
} else {
    document.getElementById('results-ssi').innerHTML = _results_ssi;
    // Session Storage seems to not how the information long enough....
    // The values of sessionStorage are not kept when the popuphtml is 
    // closed - the lifetime is too short.
    // 
    // HOwever, localStorage is too long. Or, more specifically, it does
    // not refresh when the activeTab is refreshed. 
    // 
    // TODO: Thus, I think I need to see how to invoke script, to reset the 
    //       localStorage values 
    //
    //       ASIDE: Is this the best impl? To manually resest the localStorage 
    //       variables? I could see how this is not correct. I could image that 
    //       the user should not be taking over these type of controls; if the 
    //       browser is explicitly scheduled and responsible for resesting 
    //       localStorage variables, then we should implement with similiar 
    //       features. However, i am unsure what the case is now. We will have to 
    //       study this. 
}


// Q: Look into the type of script or functionality that should be stored in the 
//    popup.html, content scripts, and background scripts.
// 
// 


      

let invoke_ssi = document.getElementById('invoke-ssi');
let results_ssi = document.getElementById('results-ssi');
// ^^^ Here, the script knows that there is an ID called
// 'changeColor'; it is the name of the button in the original 
// hhtml 
//
// Thus, it seems that this popup.js needs to know the structure 
// of the html page. This script needs to have knowledge of the 
// various buttoms, div blocks, and overall contents and how to 
// refer to them. 

//chrome.storage.sync.get('color', function(data) {
//    invoke_ssi.style.backgroundColor = data.color;
//    invoke_ssi.setAttribute('value', data.color);
//});
// ^^^ This seems like the 'chrome.storage.sync' allows a user
// tpo store key-value pairs. The way this example seems to be using 
// it is by setting 'color' to rga code during the background.js, and 
// those values are being retrieved here. 
// 
// NOTE: It turns out that I dont really need this. All it did was 
// change the background color of the buttom. Great for illustration
// but not very useful for current use case. 



invoke_ssi.onclick = function (element) { // element -> MouseEvent
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Invoke the SSI code and track test-time. 
        var t0 = performance.now()
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: "bfm_ssi_1.js" }
        );
        var t1 = performance.now();
        // Log test-time to console. 
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'console.log("BFM-SSI TOOK: ' + (t1 - t0) + ' ms");' }
        );

        var _result = "<p>BFM-SSI took: " + (t1 - t0) + " ms.</p>";
        // Write results to the popup-html
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: results_ssi.innerHTML = _result }
        );

        // LOCAL-STORAGE
        // localStorage.setItem("results-ssi", _result);

        // SESSION-STORAGE
        sessionStorage.setItem("results-ssi", _result);


    });
};

//{ file: "bfm_ssi_1.js", code: 'console.log("Hey");' }
// ^^^ NOTE: Code and file should not be specified at the same time
// in the second argument. 

    // Syntax: chrome.tabs.query(object queryInfo, function callback)
    //   - Get all tabs that have the specified properties, or all tabs if no 
    //     properties are specified. 
    // 
    // Syntax: chrome.tabs.executeScript(integer tabId, object details, function callback)
    //   - Injects JavaScript code into a page. For details, see the programmatic 
    //     injection section of the content scripts doc. 
    // 
    //     tabId : The ID of the tab in which to run the script; defaults to
    //             the active tab of the current window. 
    //
    //     details: Details of the script to run. Either the code of the file property
    //              must be set, but both may not be set at the same time. 
    // 
    //       * code: JavaScript of CSS code to inject. 
    // 
    // NOTE: Use the chrome.tabs API to interact with the browser's tab system. 
    // You can use this API to create, modify, and rearange tabs in the browser. 
    // 
    // NOTE: You can use most chrome.tabs methods and events without declaring any 
    // permissions in the extentsion's manifest file (there are some excepts though). 
    // 
    // 

// "HTML DOM allows JavaScript to react to HTML events".
// 
// This entire block of code above is a funciton attached to an HTML element.
//   - the onclick of a button invokes this. 
// 
// "A JavaScript can be executed when an event occurs, like when a user clicks
// on an HTML element."
//   - This does not only apply to buttons but to all HTML elements. 
// 
// Various Syntax for onclick events: 
//   - HTML: <element onclick="myScript">
//   - JAVASCRIPT: object.onclick = function(){myScript};
//   - JAVASCRIPT: object.addEventListener("click", myScript);

// ---------------------------------------------------------------------------:
// JavaScript Events: 
// ------------------
// HTML events are 'things' that happend to HTML elements. 
// When JavaScript is used in HTML pages, JavaScript can "react" on these 
// events. 
//
// ---------------------------------------------------------------------------:
// 
// SO: How can I run this script when the tab reloads (chrome extension)? 
// https://stackoverflow.com/questions/16949810/how-can-i-run-this-script-when-the-tab-reloads-chrome-extension
//   - Would like to run a scrtip when the tab reloads in a specified URL (i will want all URLs)
//   
//   Outset: Script in the content scripts section of the manifest. 
//           with permissions 'activeTab' and "tabs". 
//
//   Solution: "[...]. Instead , we will put the listener in a background page and inject"
//             "the code only on a refresh page."
// 



// https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.1/es5/startup.js

//
//
/*
<script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script >
    */


/*
 <script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
 */









