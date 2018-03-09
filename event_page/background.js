function copyStringToClipboard(str){
    let textArea = document.createElement('textarea');
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();
    const result = document.execCommand('copy');
    textArea.parentElement.removeChild(textArea);

    return result;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if(request.name === 'clip_html'){
        sendResponse({result : copyStringToClipboard(request.html)});
    }

    return false;
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    console.log(changeInfo);
    const urlPattern = /\w+:\/\/\w+\.esa.io\/posts\/.+/;
    const urlExclude = /.+\.md(?:&.*)?/;

    if(changeInfo.status === 'loading'){
        if(urlPattern.test(changeInfo.url) && !urlExclude.test(changeInfo.url)){
            chrome.pageAction.show(tabId);
        }
        else{
            chrome.pageAction.hide(tabId);
        }
    }
});

chrome.runtime.onSuspend.addListener(function(){
    chrome.runtime.sendMessage({name: 'close_popup'});
});
