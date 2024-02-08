fetch("https://kea-alt-del.dk/t7/api/brands")
  .then((res) => res.json())
  .then(showBrands);

function showBrands(brands) {
  console.log(brands);

  const collator = new Intl.Collator("da", { sensitivity: "base" });

  // Sorter brands i alfabetisk rækkefølge baseret på brandname
  brands.sort((a, b) => collator.compare(a.brandname, b.brandname));

  const template = document.querySelector("#productTemplate").content;
  const article = document.querySelector("article");

  brands.forEach((brand) => {
    const copy = template.cloneNode(true);
    copy.querySelector("p").textContent = brand.brandname;
    article.appendChild(copy);
  });
}
