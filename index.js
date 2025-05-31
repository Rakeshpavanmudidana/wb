window.addEventListener('DOMContentLoaded', function () {
  const dobInput = document.getElementById("dob");
  const today = new Date();

  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

  dobInput.min = formatDate(minDate);
  dobInput.max = formatDate(maxDate);

  console.log("Min Date:", dobInput.min);
  console.log("Max Date:", dobInput.max);
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

let entries = JSON.parse(localStorage.getItem('entries')) || [];

addrows();

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acceptedTerms = document.getElementById('toggle').checked ? 'true' : 'false';

  entries.push({ name, email, password, dob, acceptedTerms });
  localStorage.setItem('entries', JSON.stringify(entries));
  addrow({ name, email, password, dob, acceptedTerms });
  this.reset();
});

function addrow(entry) {
  const table = document.querySelector('table');
  const newRow = table.insertRow(-1);
  newRow.innerHTML = `
    <td class="px-3 py-2 whitespace-nowrap">${entry.name}</td>
    <td class="px-3 py-2 whitespace-nowrap">${entry.email}</td>
    <td class="px-3 py-2 whitespace-nowrap">${entry.password}</td>
    <td class="px-3 py-2 whitespace-nowrap">${entry.dob}</td>
    <td class="px-3 py-2 whitespace-nowrap">${entry.acceptedTerms}</td>
  `;
}

function addrows() {
  entries.forEach(entry => addrow(entry));
}
