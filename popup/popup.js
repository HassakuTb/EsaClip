chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);

    

    return true;
})

function showSucceed(){
    document.getElementById('succeed').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('processing').style.display = 'none';
}

function showError(message){
    let error_reason = document.getElementById('error_reason');
    error_reason.innerHTML = message;
    document.getElementById('succeed').style.display = 'none';
    document.getElementById('error').style.display = 'block';
    document.getElementById('processing').style.display = 'none';
}

function showProcessing(){
    document.getElementById('succeed').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('processing').style.display = 'block';
}
