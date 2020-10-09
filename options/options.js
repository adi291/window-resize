const saveOptions = () => {
  const val_w = document.querySelector("#size_w").value;
  const val_h = document.querySelector("#size_h").value;
  const reg = /^[0-9]{1,4}$/;
  if (reg.test(val_w) && reg.test(val_h)) {
    const key = val_w + 'x' + val_h;
    browser.storage.sync.get('sizes', ({ sizes = {} }) => {
      console.info(sizes);
      sizes[key] = { w: val_w, h: val_h };
      browser.storage.sync.set({ sizes }).then(() => {
        loadOptions();
      });
    });
  }
  //e.preventDefault();
}

const removeOptions = e => {
  const key = e.target.parentNode.parentNode.dataset.key;
  browser.storage.sync.get('sizes', ({ sizes = {} }) => {
    delete sizes[key];
    browser.storage.sync.set({ sizes });
    loadOptions();
  });
}

const loadOptions = () => {

  const body = document.querySelector(".show table tbody");
  body.innerHTML = '';
  browser.storage.sync.get('sizes', ({ sizes = { '1600x900': { w: 1600, h: 900 } } }) => {
    for (const key in sizes) {
      const obj = sizes[key];
      if (!obj.w || !obj.h)
        continue;

      const tr = document.createElement('tr');
      tr.dataset.key = key;

      const td1 = document.createElement('td');
      td1.innerText = obj.w;

      const td2 = document.createElement('td');
      td2.innerText = 'X';

      const td3 = document.createElement('td');
      td3.innerText = obj.h;

      const td4 = document.createElement('td');
      const img = document.createElement('img');
      img.src = "remove.png";
      img.onclick = removeOptions;
      td4.appendChild(img);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      body.appendChild(tr);
    }
  });

}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector("#add").addEventListener("click", saveOptions);
