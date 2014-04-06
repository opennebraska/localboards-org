'use strict';

function shared_toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function shared_showLoader() {
	$("#loading").show();
}

function shared_hideLoader() {
	$("#loading").hide();
}