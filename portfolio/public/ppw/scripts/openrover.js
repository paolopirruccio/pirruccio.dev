window.onload = gestoreLoadRover();

function openrover(evt, RoverName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(RoverName).style.display = "block";
	evt.currentTarget.className += " active";
}


function gestoreLoadRover() {
	try {
		var tablinks = document.getElementsByClassName('tablinks');
		for (var i = 0; i < tablinks.length; i++) {
			tablinks[i].onclick = function() {
				gestoreClickRover(this);
			}
		}
	} catch (e) {
		console.log(e);
	}
}

function gestoreClickRover(tab) {
	tabname = tab.innerHTML;
	openrover(event, tabname)
}