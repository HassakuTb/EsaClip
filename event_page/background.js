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

chrome.pageAction.onClicked.addListener(function(tab){
    console.log('Hello');
});
