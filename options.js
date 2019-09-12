function save_options() {
	let tempUnit = document.getElementById('tempChoose').checked;
	alert(tempUnit);
	chrome.storage.local.set(
		{
			units: tempUnit
		},
		function() {}
	);
}

function restore_options() {
	chrome.storage.local.get(
		{
			units: true
		},
		function(item) {
			document.getElementById('tempChoose').checked = item.units;
		}
	);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
