function getHtml(){
    const markdown = document.getElementsByClassName('markdown');
    console.log(markdown);

    return markdown[0].innerHTML;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if(request.name === 'get_html'){
        sendResponse({html : getHtml()});
    }

    return false;
});
