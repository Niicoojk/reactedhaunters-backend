window.onload = () => {
	let logSignCharger = document.querySelector("#choice");
	let closePopup = document.querySelector("#closePopup");
	let overlay = document.querySelector("#overlay");
	let popup = document.querySelector("#popup");

	logSignCharger.onclick = (e) => {
		overlay.classList.remove("hidden");
		popup.classList.remove("hidden");
	};

	closePopup.onclick = (e) => {
		overlay.classList.add("hidden");
		popup.classList.add("hidden");
	};
};
