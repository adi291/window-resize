var defaultVal = { '1600x900': { w: 1600, h: 900 } };
var liList = document.querySelector("#size-list");

function appendToList(size) {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.dataset.width = size.w;
  a.dataset.height = size.h;
  a.textContent = size.w + ' x ' + size.h;
  li.appendChild(a);
  liList.appendChild(li);
};

function init(data) {
  var sizes = data.sizes || defaultVal;
  console.info(sizes);

  liList.innerHTML = '';

  for (const key in sizes) {
    const obj = sizes[key];
    if (!obj.w || !obj.h)
      continue;
    appendToList(obj);
  }
}

browser.storage.sync.get('sizes').then(init);

liList.addEventListener("click", (e) => {
  if (e.target.nodeName != "A") {
    window.close();
    return;
  }
  var w = parseInt(e.target.dataset.width || '0');
  var h = parseInt(e.target.dataset.height || '0');
  if (w == 0 || h == 0) {
    return;
  }
  browser.windows.getCurrent().then((curr) => {
    var size = { width: w, height: h };
    browser.windows.update(curr.id, size);
    window.close();
  });
});
