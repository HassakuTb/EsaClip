function copyStringToClipboard(str){
    let texaArea = document.createElement('textarea');
    texaArea.value = str;
    document.body.appendChild(textarea);
    texaArea.select();
    const result = document.execCommand('copy');
    texaArea.parentElement.removeChild(textArea);

    return result;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if(request.name === 'clip_html'){
        sendResponse({result : copyStringToClipboard(request.html)});
    }

    return true;
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
