var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var currentDivID = 'clock';
var isFullScreen = false;
var isExpanded = false;
var textSizes = ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
var currentIndex = 3;
var currentTimerDiv = "countdown";
var currentTimer;

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
		stopTimer();
		
		if (currentDivID == "world") {
			getTimesTimeZones();
		}  
	}
}


/*
 * Clock functions
 */

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

function toggleExpanded() {
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


/*
 * World Clock functions
 */

function getTimesTimeZones(){
	var local = document.getElementById("time_zone_local");
	var gmt = document.getElementById("time_zone_gmt");
	var pdt = document.getElementById("time_zone_pdt");
	var hkt = document.getElementById("time_zone_hkt");

	local.value = getTime(false, 0);
	gmt.value = getTime(true, 0);
	pdt.value = getTime(true, -7);
	hkt.value = getTime(true, 8);
}

function getTime(has_offset, offset){
	// create Date object for current location
    var d = new Date();

	var value = d.toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'});

	if (has_offset){
		// convert to msec
		// subtract local time zone offset
		// get UTC time in msec
		var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

		// create new Date object for different city
		// using supplied offset
		var nd = new Date(utc + (3600000 * offset));

		value = nd.toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'});
	}
	return value;
}


/*
 * Timer functions
 */

function startCountdown(){
	if (currentTimerDiv != "countdown"){
		changeTimerDiv("countdown");
	}

	var h = + document.getElementById("countdownHours").value;
	var m = + document.getElementById("countdownMinutes").value;
	var s = + document.getElementById("countdownSeconds").value;

	var totaltime = s + (m * 60) + (h * 60 * 60);

	if (s >= 60){
		m = m + Math.floor(s / 60);
		s = s % 60;
	}

	if (m >= 60){
		h = h + Math.floor(m / 60);
		m = m % 60;
	}

	if (h < 10 ){
		h = '0' + h;
	}
	if (m < 10 ) {
		m = '0' + m; 
	}
	if (s < 10){
		s = '0' + s;
	}

	totaltime --;

	document.getElementById("timerValue").innerHTML = h + ":" + m + ":" + s;

	clearInterval(currentTimer);

	// Update the count down every 1 second
	currentTimer = setInterval(function() {
	    var helper = totaltime;

	    // Time calculations for hours, minutes and seconds
	    var hours = Math.floor(helper / (60 * 60));
	    helper = helper % (60 * 60);
	    var minutes = Math.floor(helper / 60);
	    helper = helper % 60;
	    var seconds = Math.floor(helper);

	    if (hours < 10 ){
			hours = '0' + hours;
		}
		if (minutes < 10 ) {
			minutes = '0' + minutes; 
		}
		if (seconds < 10){
			seconds = '0' + seconds;
		}
	    
	    // Output the result in an element with id="demo"
	    document.getElementById("timerValue").innerHTML = hours + ":" + minutes + ":" + seconds;
	    
	    // If the count down is over, write some text 
	    if (totaltime <= 0) {
	        clearInterval(currentTimer);
	        document.getElementById("timerValue").innerHTML = "EXPIRED";
	    }
	    totaltime --;
	}, 1000);
}

function startAlarm(){
	if (currentTimerDiv != "alarm"){
		changeTimerDiv("alarm");
	}

	var h = + document.getElementById("alarmHours").value;
	var m = + document.getElementById("alarmMinutes").value;
	var s = + document.getElementById("alarmSeconds").value;

	if (h >= 24 || m >= 60 || s >= 60){
		return;
	}

	var nowDate = new Date()
	var hour = nowDate.getHours();
	var minute = nowDate.getMinutes();
	var second = nowDate.getSeconds();

	var setDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), h, m, s, 0);

	//See how much time is left from now to the defined time
	if (h < hour || (h == hour && m < minute) || (h == hour && m == minute && s < second)){
		//The given time is the next day
		setDate.setDate(nowDate.getDate() + 1);
	}

	var totaltime = (setDate.getTime() - nowDate.getTime()) / 1000;

	var helper = totaltime;

	// Time calculations for hours, minutes and seconds
	h = Math.floor(helper / (60 * 60));
	helper = helper % (60 * 60);
	m = Math.floor(helper / 60);
	helper = helper % 60;
	s = Math.floor(helper);

	if (h < 10 ){
		h = '0' + h;
	}
	if (m < 10 ) {
		m = '0' + m; 
	}
	if (s < 10){
		s = '0' + s;
	}

	totaltime --;

	document.getElementById("timerValue").innerHTML = h + ":" + m + ":" + s;

	clearInterval(currentTimer);

	// Update the count down every 1 second
	currentTimer = setInterval(function() {
	    helper = totaltime;

	    // Time calculations for hours, minutes and seconds
	    var hours = Math.floor(helper / (60 * 60));
	    helper = helper % (60 * 60);
	    var minutes = Math.floor(helper / 60);
	    helper = helper % 60;
	    var seconds = Math.floor(helper);

	    if (hours < 10 ){
			hours = '0' + hours;
		}
		if (minutes < 10 ) {
			minutes = '0' + minutes; 
		}
		if (seconds < 10){
			seconds = '0' + seconds;
		}
	    
	    // Output the result in an element with id="demo"
	    document.getElementById("timerValue").innerHTML = hours + ":" + minutes + ":" + seconds;
	    
	    // If the count down is over, write some text 
	    if (totaltime <= 0) {
	        clearInterval(currentTimer);
	        document.getElementById("timerValue").innerHTML = "EXPIRED";
	    }
	    totaltime --;
	}, 1000);

	//TODO
}

function startStopwatch(){
	if (currentTimerDiv != "stopwatch"){
		changeTimerDiv("stopwatch");
	}

	var totaltime = 1;

	document.getElementById("timerValue").innerHTML = "00:00:00";

	clearInterval(currentTimer);

	// Update the count down every 1 second
	currentTimer = setInterval(function() {
	    var helper = totaltime;

	    // Time calculations for hours, minutes and seconds
	    var hours = Math.floor(helper / (60 * 60));
	    helper = helper % (60 * 60);
	    var minutes = Math.floor(helper / 60);
	    helper = helper % 60;
	    var seconds = Math.floor(helper);

	    if (hours < 10 ){
			hours = '0' + hours;
		}
		if (minutes < 10 ) {
			minutes = '0' + minutes; 
		}
		if (seconds < 10){
			seconds = '0' + seconds;
		}
	    
	    // Output the result in an element with id="demo"
	    document.getElementById("timerValue").innerHTML = hours + ":" + minutes + ":" + seconds;
	    
	    totaltime ++;
	}, 1000);
}

function changeTimerDiv(newDiv){
	document.getElementById(currentTimerDiv).classList.remove("timerdivSelected");
	document.getElementById(newDiv).className = "timerdivSelected";
	var vertivalValue;
	if(newDiv == "countdown"){
		vertivalValue = "15%";
	}
	else if (newDiv == "alarm"){
		vertivalValue = "38.3%";
	}
	else{
		vertivalValue = "61.6%";
	}
	document.getElementById("divVertical").style.left = vertivalValue;
	currentTimerDiv = newDiv;
}

function stopTimer(){
	clearInterval(currentTimer);
	document.getElementById("timerValue").innerHTML = "EXPIRED";
}


/*
 * Notes functions
 */

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