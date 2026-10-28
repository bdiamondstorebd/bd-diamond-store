
const packages = [
  { name: "25 Diamonds", price: 25, icon: "💎" },
  { name: "50 Diamonds", price: 40, icon: "💎" },
  { name: "115 Diamonds", price: 89, icon: "💎" },
  { name: "240 Diamonds", price: 169, icon: "💎" },
  { name: "355 Diamonds", price: 249, icon: "💎" },
  { name: "505 Diamonds", price: 355, icon: "💎" },
  { name: "Weekly Lite", price: 45, icon: "🎁" },
  { name: "Weekly Membership", price: 159, icon: "👑" },
  { name: "Monthly Membership", price: 799, icon: "🏆" }
];

const $ = id => document.getElementById(id);

const grid = $("packageGrid");
const select = $("packageSelect");
const form = $("orderForm");

function loadPackages() {
  grid.innerHTML = "";
  select.innerHTML = '<option value="">প্যাকেজ নির্বাচন করো</option>';

  packages.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${item.name} — ৳${item.price} (ডেমো)`;
    select.appendChild(option);

    const card = document.createElement("article");
    card.className = "package-card";

    const picture = document.createElement("div");
    picture.className = "package-picture";
    picture.textContent = item.icon;

    const title = document.createElement("h3");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = `৳${item.price}`;

    const note = document.createElement("small");
    note.textContent = "ডেমো মূল্য";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = "প্যাকেজ সিলেক্ট";

    button.addEventListener("click", () => {
      select.value = String(index);
      $("topup").scrollIntoView({ behavior: "smooth" });
      $("toast").textContent = `${item.name} নির্বাচন করা হয়েছে।`;
    });

    card.append(picture, title, price, note, button);
    grid.appendChild(card);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const playerId = $("playerId").value.trim();
  const index = select.value;
  const item = packages[index];

  if (!/^[0-9]{6,15}$/.test(playerId)) {
    alert("Player ID অবশ্যই ৬–১৫টি সংখ্যার হতে হবে।");
    return;
  }

  if (index === "" || !item) {
    alert("আগে একটি প্যাকেজ নির্বাচন করো।");
    return;
  }

  const orderId = "BD" + Date.now().toString().slice(-8);

  const order = {
    playerId,
    package: item.name,
    price: item.price,
    server: $("server").value,
    payment: $("payment").value,
    status: "ডেমো অর্ডার — পেমেন্ট ও ডেলিভারি চালু নেই"
  };

  try {
    const orders = JSON.parse(
      localStorage.getItem("bdDemoOrders") || "{}"
    );

    orders[orderId] = order;
    localStorage.setItem("bdDemoOrders", JSON.stringify(orders));
  } catch {
    alert("ডেমো অর্ডার সংরক্ষণ করা যায়নি।");
    return;
  }

  $("toast").textContent = `ডেমো অর্ডার তৈরি হয়েছে: ${orderId}`;

  alert(
    `Order ID: ${orderId}\n` +
    `Player ID: ${playerId}\n` +
    `Package: ${item.name}\n` +
    `Demo Price: ৳${item.price}\n\n` +
    "এটি শুধু ডেমো। কোনো টাকা দিও না; ডায়মন্ড পাঠানো হবে না।"
  );

  form.reset();
});

$("statusForm").addEventListener("submit", event => {
  event.preventDefault();

  const id = $("orderId").value.trim().toUpperCase();

  try {
    const orders = JSON.parse(
      localStorage.getItem("bdDemoOrders") || "{}"
    );
    const order = orders[id];

    $("statusResult").textContent = order
      ? `অর্ডার: ${id} | ${order.package} | ${order.status}`
      : "এই ব্রাউজারে ডেমো অর্ডারটি পাওয়া যায়নি।";
  } catch {
    $("statusResult").textContent = "অর্ডারের তথ্য পড়া যায়নি।";
  }
});

$("year").textContent = new Date().getFullYear();

loadPackages();
