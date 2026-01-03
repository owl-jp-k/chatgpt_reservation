const form = document.getElementById("reservationForm");
const list = document.getElementById("reservationList");

let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

function renderReservations() {
  list.innerHTML = "";
  reservations.forEach(res => {
    const li = document.createElement("li");
    li.textContent = `${res.date} ${res.time} - ${res.name}`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const exists = reservations.some(
    r => r.date === date && r.time === time
  );

  if (exists) {
    alert("その日時はすでに予約されています");
    return;
  }

  const reservation = { name, date, time };
  reservations.push(reservation);
  localStorage.setItem("reservations", JSON.stringify(reservations));

  renderReservations();
  form.reset();
});

renderReservations();
