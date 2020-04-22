(function (window, document, chrome) {
  const tableHtmlHeader =
    "<table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>";
  const tableHtmlFooter = "</tbody></table>";

  /**
   * 行
   */
  class Row {
    constructor(key, value) {
      (this.key = key), (this.value = value);
    }
  }

  function randerTable(rows, filter_callback) {
    let tableHtml = `${tableHtmlHeader}${tableHtmlFooter}`;
    if (rows != null) {
      let rowsHtml = "";
      rows.filter(filter_callback).forEach((row) => {
        rowsHtml += `<tr><td>${row.key}</td><td>${row.value}</td></tr>`;
      });
      tableHtml = `${tableHtmlHeader}${rowsHtml}${tableHtmlFooter}`;
    }
    // console.log(tableHtml);
    document.getElementById("table").innerHTML = tableHtml;
  }

  function currentTabExecScript(script, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currTab = tabs[0];
      // console.log(currTab.id);
      let exec = chrome.tabs.executeScript;
      exec(currTab.id, { code: script }, function (result) {
        callback(result);
      });
    });
  }

  function currentTabExecScriptFile(scriptFile, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currTab = tabs[0];
      // console.log(currTab.id);
      let exec = chrome.tabs.executeScript;
      exec(currTab.id, { file: scriptFile }, function (result) {
        callback(result[0]);
      });
    });
  }

  /**
   * 初始化
   */
  function init() {
    // document.getElementById("copy").addEventListener(
    //   "click",
    //   function () {
    //     // 添加一个元素，用来装载文本
    //     var w = document.createElement("tmp_input");
    //     w.value = "hello crx";
    //     document.body.appendChild(w);
    //     w.select();
    //     // 调用浏览器的复制命令
    //     document.execCommand("Copy");
    //     // 删除元素
    //     document.body.removeChild(w);
    //     alert("已复制到粘贴板");
    //   },
    //   false
    // );

    let filterStr = document.getElementById("filter").value;
    console.log(filterStr);
    currentTabExecScriptFile("inject.js", function (localStorage) {
      let rows = [];
      Object.keys(localStorage).forEach(function (key) {
        rows.push(new Row(key, String(localStorage[key])));
      });
      randerTable(rows, (row) => {
        return row.key == filterStr;
      });
    });
  }
  //////////////////////////////////////////////////////
  init();
})(window, document, chrome);
