chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
    if(request.name === 'close_popup'){
        window.close();
    }
});

function showSucceed(){
    document.getElementById('succeed').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('processing').style.display = 'none';
}

function showError(){
    document.getElementById('succeed').style.display = 'none';
    document.getElementById('error').style.display = 'block';
    document.getElementById('processing').style.display = 'none';
}

function showProcessing(){
    document.getElementById('succeed').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('processing').style.display = 'block';
}

showProcessing();
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {name:'get_html'}, function(response){
        console.log(response);
        chrome.runtime.sendMessage({name:'clip_html', html:response.html}, function(resp){
            console.log(resp);
            if(resp.result){
                showSucceed();
            }
            else{
                showError();
            }
        })
    });
});
