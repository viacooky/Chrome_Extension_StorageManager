var obj;

function getLocalStorage() {
  let rs = {};
  Object.keys(localStorage).forEach(function (key) {
    rs[key] = localStorage.getItem(key);
  });
  return rs;
}

obj = getLocalStorage();

obj;
