function saveOptions(e) {
	var val = (document.querySelector("#size").value || '').toLocaleLowerCase();
	if(/^[0-9]{1,4}x[0-9]{1,4}(,[0-9]{1,4}x[0-9]{1,4})*$/.test(val)){
		browser.storage.sync.set({sizeVal: val});
	}else{
		console.info(1);
	}
	//e.preventDefault();
}

function loadOptions() {
	var gettingItem = browser.storage.sync.get('sizeVal');
	gettingItem.then((res) => {
		document.querySelector("#size").value = res.sizeVal || '1920x1080,1600x900';
	});
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector("#size").addEventListener("change", saveOptions);
