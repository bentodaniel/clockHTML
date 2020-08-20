var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var currentDivID = 'clock';
var isFullScreen = false;
var isExpanded = false;
var textSizes = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
var currentIndex = 3;

function display_c() {
	var refresh = 1000; // Refresh rate in milli seconds
	mytime = setTimeout('display_ct()',refresh)
}

function display_ct() {
	var x = new Date()
	var hour = x.getHours();
	var minute = x.getMinutes();
	var second = x.getSeconds();
	if (hour < 10 ){
		hour = '0' + hour;
	}
	if (minute < 10 ) {
		minute = '0' + minute; 
	}
	if (second < 10){
		second = '0' + second;
	}

	document.getElementById('hoursHead').innerHTML = hour + ':' + minute;
	document.getElementById('hoursContent').innerHTML = hour + ':' + minute + ':' + second;
	document.getElementById('daysContent').innerHTML = months[x.getMonth()] + ' ' + x.getDate() + ' - ' + days[x.getDay()];
	display_c();
}

window.onload = function() {
	display_ct();
}

function changeContent(id) {
	if (currentDivID != id){
		document.getElementById(currentDivID).style.display = "none";
	  	document.getElementById(id).style.display = "block";
	  	currentDivID = id;
	}
}

function toggleFullscreen() {
	if (!isFullScreen){
		elem = document.getElementById("clock");

	  	if (elem.requestFullscreen) {
	    	elem.requestFullscreen();
	  	} else if (elem.mozRequestFullScreen) { /* Firefox */
	    	elem.mozRequestFullScreen();
	  	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
	    	elem.webkitRequestFullscreen();
	  	} else if (elem.msRequestFullscreen) { /* IE/Edge */
	    	elem.msRequestFullscreen();
	  	}
	  	isFullScreen = true;

	}
	else {
		if (document.exitFullscreen) {
	    	document.exitFullscreen();
	  	} else if (document.mozCancelFullScreen) { /* Firefox */
	    	document.mozCancelFullScreen();
	  	} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
	    	document.webkitExitFullscreen();
	  	} else if (document.msExitFullscreen) { /* IE/Edge */
	    	document.msExitFullscreen();
	  	}
	  	isFullScreen = false;
	}
}

function toggleExpanced() {
	elem = document.getElementById("content");

	if (!isExpanded){
		elem.style.top = '0';
		elem.style.height = '100%';
		isExpanded = true;
	}
	else {
		elem.style.top = '9%';
		elem.style.height = '88%';
		isExpanded = false;
	}
}

function decreaseTextSize(){
	if (currentIndex > 0){
		document.getElementById("txtArea").style.fontSize = textSizes[currentIndex - 1];
		currentIndex = currentIndex - 1;

		if (currentIndex == 0){
			document.getElementById("decreaseSize").disabled = true;
		}
		if (document.getElementById("increaseSize").disabled == true){
			document.getElementById("increaseSize").disabled = false;
		}
	}
}

function increaseTextSize(){
	if (currentIndex < 6){
		document.getElementById("txtArea").style.fontSize = textSizes[currentIndex + 1];
		currentIndex = currentIndex + 1;

		if (currentIndex == 6){
			document.getElementById("increaseSize").disabled = true;
		}
		if (document.getElementById("decreaseSize").disabled == true){
			document.getElementById("decreaseSize").disabled = false;
		}
	}
}

function saveText() {
	var text = document.getElementById("txtArea").value;
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text], { type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "notes.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}