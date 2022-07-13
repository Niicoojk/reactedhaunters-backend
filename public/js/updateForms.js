window.onload = () => {
	let form = document.querySelector("form");
	let prevSubmit = document.querySelector("#prevSubmit");
	let confirmation = document.querySelector("#confirmation");
	let overlay = document.querySelector("#overlay");
	let popup = document.querySelector("#popup");

	prevSubmit.addEventListener("click", (e) => {
		e.preventDefault();
		prevSubmit.classList.add("hidden");
		console.log("click");
		confirmation.classList.remove("hidden");
	});
};
