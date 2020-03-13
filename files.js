const fs = require('fs');

fs.readdir("\\\\SRV-TOMCAT\\upload_doc", function(err, items) {
    console.log(items); 
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }
});