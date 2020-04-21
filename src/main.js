function showStorageTable(arg1, arg2){
    var table = '<table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';
    table += '<tr>';
    table += '<td>' + arg1 + '</td>';
    table += '<td>' + arg2 + '</td>';
    table += '</tr>';
    table += '</tbody></table>';
    document.getElementById('table').innerHTML = table;
}

function GetXbbAccessToken(){
    if(!window.localStorage){
        alert('浏览器不支持localStorage!');
    }
    document.getElementById('getAccessToken').onclick = function(){
        //   chrome.storage.sync.get(['xbbAccessToken'], function(result) {
        //     console.log('Value currently is ' + result.key);
        //     alert(result);
        //   });
        chrome.storage.sync.set({"xxxx":"xxxxxxxxxxxxxxxx"},function(){});
        chrome.storage.sync.get("xxxx", function(rs){
            console.log(rs.xxxx);
            alert(rs.xxxx);
        });
        
        var rr = getStorage();
        console.log(rr);
        alert(rr);
    }
    
}

function getStorage() {
    var obj = {};
    var storage = localStorage ;
    if (storage === undefined) {
        return;
    }

    var specialKeys = [
        'length', 'key', 'getItem',
        'setItem', 'removeItem', 'clear'
    ];

    for (var i in storage) {
        if (storage.hasOwnProperty(i)) {
            obj[i] = storage.getItem(i);
        }
    }

    var item;
    for (var i in specialKeys) {
        item = storage.getItem(specialKeys[i]);
        if (item !== null) {
            obj[specialKeys[i]] = item;
        }
    }

    return obj;
}

GetXbbAccessToken();