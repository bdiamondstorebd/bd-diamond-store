
const packages = [
  { name: "25 Diamonds", price: 25 },
  { name: "50 Diamonds", price: 40 },
  { name: "115 Diamonds", price: 89 },
  { name: "240 Diamonds", price: 169 },
  { name: "355 Diamonds", price: 249 },
  { name: "505 Diamonds", price: 355 },
  { name: "Weekly Lite", price: 45 },
  { name: "Weekly Membership", price: 159 },
  { name: "Monthly Membership", price: 799 }
];

const grid = document.getElementById("packageGrid");
const select = document.getElementById("packageSelect");
const form = document.getElementById("orderForm");

function loadPackages() {
  grid.innerHTML = "";
  select.innerHTML = '<option value="">প্যাকেজ নির্বাচন করো</option>';

  packages.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${item.name} — ৳${item.price} (ডেমো)`;
    select.appendChild(option);

    const card = document.createElement("div");
    card.className = "package-card";

    const title = document.createElement("h3");
    title.textContent = "💎 " + item.name;

    const price = document.createElement("p");
    price.textContent = `৳${item.price} — ডেমো মূল্য`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = "প্যাকেজ সিলেক্ট";

    button.addEventListener("click", () => {
      select.value = String(index);
      document.getElementById("topup").scrollIntoView({
        behavior: "smooth"
      });
    });

    card.append(title, price, button);
    grid.appendChild(card);
  });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const playerId = document.getElementById("playerId").value.trim();
  const index = select.value;
  const item = packages[index];

  if (!/^[0-9]{6,15}$/.test(playerId)) {
    alert("সঠিক Player ID লিখো। ৬ থেকে ১৫টি সংখ্যা হতে হবে।");
    return;
  }

  if (index === "" || !item) {
    alert("আগে একটি প্যাকেজ সিলেক্ট করো।");
    return;
  }

  const orderId = "BD" + Date.now().toString().slice(-8);

  const order = {
    orderId: orderId,
    playerId: playerId,
    package: item.name,
    price: item.price,
    server: document.getElementById("server").value,
    payment: document.getElementById("payment").value,
    status: "ডেমো অর্ডার — পেমেন্ট ও ডেলিভারি চালু নেই"
  };

  try {
    const orders = JSON.parse(
      localStorage.getItem("bdDemoOrders") || "{}"
    );
    orders[orderId] = order;
    localStorage.setItem("bdDemoOrders", JSON.stringify(orders));
  } catch (error) {
    alert("অর্ডার সংরক্ষণ করা যায়নি।");
    return;
  }

  document.getElementById("toast").textContent =
    `ডেমো অর্ডার তৈরি হয়েছে: ${orderId}`;

  alert(
    `ডেমো অর্ডার: ${orderId}\n` +
    `প্যাকেজ: ${item.name}\n` +
    `ডেমো মূল্য: ৳${item.price}\n\n` +
    "এটি বাস্তব অর্ডার নয়। টাকা দিও না। ডায়মন্ড পাঠানো হবে না।"
  );

  form.reset();
});

document.getElementById("statusForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const id = document.getElementById("orderId").value.trim().toUpperCase();
  const result = document.getElementById("statusResult");

  try {
    const orders = JSON.parse(
      localStorage.getItem("bdDemoOrders") || "{}"
    );
    const order = orders[id];

    result.textContent = order
      ? `অর্ডার: ${id} | ${order.package} | ${order.status}`
      : "এই ব্রাউজারে ডেমো অর্ডারটি পাওয়া যায়নি।";
  } catch (error) {
    result.textContent = "অর্ডারের তথ্য পড়া যায়নি।";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

loadPackages();
