let add = document.querySelectorAll(".add-cart");
let remove = document.querySelectorAll(".remove-cart");
let deleteCart = document.querySelector("#delete-cart");
let userName = document.querySelector("#userName").getAttribute("userName");

add.addEventListener("click", (e) => {
  let target = e.target;
  let productId = target.getAttribute("product-id");
  console.log(userName);
});
