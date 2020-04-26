
## NOTES: 

**NOTE:** This entries should be convert to blogs entries at some point. 
Granted, they will need refinement for the contents here are typically 
raw due to be created admist the working session (thus need a workflow
for editing these). 

#### Structure of a GCE project: 
As I work on the implementation for embedded-notes, I notices that 
there are specific interfaces that I need to be aware of, and that 
implementation is no straight foward becasue of the structure of 
interfaces in the GCE.

Example, upon embedded-note for contextselection, I want to get the 
respective HTML tag item. This would require: 
    `var selection = document.getSelection();`
But GCE does not allow this to be directly called within the background
scripts. When I try to do so, GCE provides the following error message, 

'Cannot access contents of the page. Extension manifest must request 
 permission to access the respective host. '

 This is due to various [security policies in GCE](https://developer.chrome.com/extensions/contentSecurityPolicy) . To address this, 
 I came across 'Message Passing'. And the following message made me 
 realize that there is an architectural perspective that I need to 
 understand. 

    'Message Passing: Since content scripts run in the context of a 
    web page and not the extension, they often need some way of 
    communicating with the rest of the extension'.
    [Excerpt from Message Passing Docs.](https://developer.chrome.com/extensions/messaging) 


This motivated me to take a step back and review the major architectural
pieces involved in a GCE and how those may relate to my project.

The main pieces to focus on are: 
* Manifest
* Background Script 
* Content Scripts

For general details on these please see the GCE Architecture docs](https://developer.chrome.com/extensions/overview#arch). Here will be focusing on how to proper partion the 
responisbilities to implement my *embedded-notes* feature. 


First, I want to use the right-click trigger as the portal to invoke the embedded-notes.
Simply, I want it to be an option within the right-click menu. This is called the 
`ContextMenu` in GCE terminology. 

Next, I need to supply a dialog prompt to user so they can input their note.

Next, I need to match this note with the HTML element. I need to access to the DOM. 

Lastly, which I dont know if we will be able to address it here, I need to 
save all this information in a database, according to the users account.


Links Reference: 
* [GCE Architecture Overview](https://developer.chrome.com/extensions/overview#arch)
* [Content Securtiy Policy](https://developer.chrome.com/extensions/contentSecurityPolicy)
* [Message Passing](https://developer.chrome.com/extensions/messaging)





## TODOS: 

### ContentMenus: 
* For note-embedding on 'selection', we need away to link the the note to the 
extact html tag. It seems this html tag info is not part of the info object. 

* Customize the window.prompt for emebedded-notes. 


## ERRORS: 

E: The background page and background scripts properties cannot
  be used at the same time.

This begs the question, "Is it better to use the background.html or a
backgroundscript.js? 

E: Unchecked runtime.lastError: Extensions using event pages or Service 
Workers must pass an id parameter to chrome.contextMenus.create

E: Unchecked runtime.lastError: Cannot access contents of the page.
Extension manifest must request permission to access the respective host.

E: Unchecked runtime.lastError: Cannot access a chrome:// URL

## Questions: 

Q: What is the '_generated_background_page.html' page? I alwasy see an error 
on this page every time I load my extension in the developer mode.

Q: Can you have multiple chrome.runtime.onInstalled.addListener in your 
background script? 
  - "Initialize the Extension: Listen to the runtime.onInstalled event
  to initialize an extension on installation. Use this event to set a 
  state of for one-time initialization, such as context menu."

  - I did more than one and there were no isues...




