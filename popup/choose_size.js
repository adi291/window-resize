var defaultVal = '1920x1080,1600x900';
var liList = document.querySelector("#size-list");

function appendToList(size) {
	var li = document.createElement('li');
	var a = document.createElement('a');
	a.dataset.width = size.width;
	a.dataset.height = size.height;
	a.textContent = size.width + ' x ' + size.height;
	li.appendChild(a);
	liList.appendChild(li);
};

function init(data) {
	var sizeStr = data.sizeVal || defaultVal;
	
	var sizes = sizeStr.split(',').map(function(size){
		var parts = size.split('x');
		var width = parseInt(parts[0] || '0');
		var height = parseInt(parts[1] || '0');
		
		if (!width || !height) {
			return null;
		}

		return { width: width, height: height };
	});
	
	sizes = sizes.filter(function(size) {
		return !!size;
	});
	
	liList.innerHTML = '';
	
	sizes.forEach(function(size) {
		appendToList(size);
	});
}

browser.storage.sync.get('sizeVal').then(init);

liList.addEventListener("click", (e) => {
	if(e.target.nodeName != "A") {
		window.close();
		return;
	}
	var w = parseInt(e.target.dataset.width || '0');
	var h = parseInt(e.target.dataset.height || '0');
	if(w == 0 || h == 0) {
		return;
	}
	browser.windows.getCurrent().then((curr) => {
		var size = { width: w, height: h };
		browser.windows.update(curr.id, size);
		window.close();
	});
});
