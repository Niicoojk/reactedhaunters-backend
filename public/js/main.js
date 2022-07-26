window.onload = () => {
  let logSignCharger = document.querySelector("#choice");
  let closePopup = document.querySelector("#closePopup");
  let overlay = document.querySelector("#overlay");
  let popup = document.querySelector("#popup");

  let searchForm = document.querySelector("#searchForm");

  logSignCharger.onclick = (e) => {
    overlay.classList.remove("hidden");
    popup.classList.remove("hidden");
  };

  closePopup.onclick = (e) => {
    overlay.classList.add("hidden");
    popup.classList.add("hidden");
  };

  /*
  searchForm.onsubmit = (e) => {
    let searchBar = document.querySelector("#searchBar");
    let searchButton = document.querySelector("#searchButton");
    let searcherror = document.querySelector("#searchError");

    let errorsJS = [];

    if (searchBar.value == "" || searchBar.value == " ") {
      errorsJS.push("Debes introducir el nombre de un producto para buscar");
    }

    if (errorsJS.length > 0) {
      e.preventDefault();

      searcherror.innerHTML += errorsJS[0];
    }
  };
	*/
};
