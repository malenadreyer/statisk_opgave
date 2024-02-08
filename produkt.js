const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);

  document.querySelector(".produktgrid p").textContent = product.articletype;
  document.querySelector(".produktgrid h1").textContent = product.brandname;
  document.querySelector(".produktgrid h2").textContent = product.productdisplayname;
  document.querySelector(".produktgrid h3 span").textContent = product.price;
  document.querySelector(".produktgrid h4 span").textContent = product.discount;

  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  const originalPrice = parseFloat(product.price);
  const discount = parseFloat(product.discount);
  const newPrice = originalPrice * (1 - discount / 100);
  document.querySelector(".price h2 span").textContent = newPrice.toFixed(2);

  const soldoutSpan = document.querySelector(".soldout span");
  if (product.soldout == 0) {
    soldoutSpan.textContent = "Køb nu";
    soldoutSpan.classList.remove("udsolgt");
    soldoutSpan.classList.add("button1");
  } else {
    soldoutSpan.textContent = "Udsolgt";
    soldoutSpan.classList.add("udsolgt");
    soldoutSpan.classList.remove("button1");
  }
}
