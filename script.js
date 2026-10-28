
const packages = [
  { name: "25 Diamonds", price: 25, type: "diamond" },
  { name: "50 Diamonds", price: 40, type: "diamond" },
  { name: "115 Diamonds", price: 89, type: "diamond" },
  { name: "240 Diamonds", price: 169, type: "diamond" },
  { name: "355 Diamonds", price: 249, type: "diamond" },
  { name: "Weekly Lite", price: 45, type: "membership" },
  { name: "Weekly Membership", price: 159, type: "membership" },
  { name: "Monthly Membership", price: 799, type: "membership" }
];

console.log("BD Diamond Store demo packages loaded", packages);

const packageGrid = document.getElementById("packageGrid");

if (packageGrid) {
  packageGrid.innerHTML = "";

  packages.forEach((item) => {
    const card = document.createElement("div");
    card.className = "package-card";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = "৳" + item.price;

    const label = document.createElement("p");
    label.textContent = "ডেমো মূল্য";

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(label);
    packageGrid.appendChild(card);
  });
}
