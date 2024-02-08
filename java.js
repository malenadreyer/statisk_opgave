fetch("https://kea-alt-del.dk/t7/api/products")
  .then((res) => res.json())
  .then(showProducts);

function showProducts(product) {
  product.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);
  const template = document.querySelector("#productTemplate").content;
  const copy = template.cloneNode(true);
  const originalPrice = parseFloat(product.price);
  const discountPercentage = parseFloat(product.discount);
  const newPrice = (1 - discountPercentage / 100) * originalPrice;

  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".price span").textContent = product.price;

  if (product.discount) {
    copy.querySelector("article").classList.add(".discount");
    copy.querySelector(".discount span").textContent = product.discount;
    copy.querySelector(".nypris span").textContent = newPrice.toFixed(2);
  } else {
    copy.querySelector(".discount").style.display = "none";
    copy.querySelector(".nypris").style.display = "none";
  }
  if (product.soldout) {
    copy.querySelector("article").classList.add("product-soldout");
  }
  copy.querySelector(".readmore").setAttribute("href", `produkt.html?id=${product.id}`);

  document.querySelector(".product1").appendChild(copy);
}
