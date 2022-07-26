window.onload = () => {
  let form = document.querySelector("form");
  let prevSubmit = document.querySelector("#prevSubmit");
  let confirmation = document.querySelector("#confirmation");
  let overlay = document.querySelector("#overlay");
  let popup = document.querySelector("#popup");

  form.onsubmit = (e) => {
    if (e.target == prevSubmit) {
      e.preventDefault();
      console.log("click");
      prevSubmit.classList.add("hidden");
      overlay.classList.remove("hidden");
      popup.classList.remove("hidden");
      confirmation.classList.remove("hidden");
    } else {
    }
  };
};
