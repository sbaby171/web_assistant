



var all = document.getElementsByTagName("*"); 
// NOTE: First loop, set the data-id and data-pid
for (var i=0, max = all.length; i < max; i++){
    //console.log(i, all[i]);
    //console.log(all[i].childNodes);
    //console.log(all[i].children);
    if (i == 0) {
        all[i].setAttribute("data-cid", 0);
        all[i].setAttribute("data-pid", -1);
    } else {
        let pid = all[i].parentElement.getAttribute("data-cid");
        all[i].setAttribute("data-cid", i);
        all[i].setAttribute("data-pid", pid);
    }
    // NOTE: On the first full-iteration, you could set both the pid and id
    //       However, I dont think you could set the children. 
}
for (var i=0, max = all.length; i < max; i++){ 
    var children = all[i].children;
    if (children.length == 0){
        all[i].setAttribute("data-children", "NA");
        continue;
    }
    for (var j=0, mmax = children.length; j < mmax; j++){
        if (j==0){
            all[i].setAttribute("data-children",children[j].getAttribute("data-cid"));
        } else {
           all[i].setAttribute("data-children", all[i].getAttribute("data-children").concat(",",children[j].getAttribute("data-cid")));
        }
    }
}

