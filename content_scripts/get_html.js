function getHtml(){
    const markdown = document.getElementsByClassName('markdown');
    console.log(markdown);

    const html = markdown[0].innerHtml.toString();
    console.log(html);
    return html;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if(request.name === 'get_html'){
        sendResponse({html : getHtml()});
    }

    return false;
});
