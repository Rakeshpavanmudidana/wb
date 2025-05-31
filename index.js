
window.addEventListener("DOMContentLoaded", function () {
  const dobInput = document.getElementById("dob");
  const today = new Date();

  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  dobInput.max = formatDate(maxDate);
  dobInput.min = formatDate(minDate);
});
function validateDob(dob) {
  const age = getAge(dob);
  return age >= 18 && age <= 55;
}
function getAge(dateString) {
  const today = new Date();
  const dob = new Date(dateString);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}


const dobInput = document.getElementById("dob");
dobInput.addEventListener("input", function () {
  const value = new Date(this.value);
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

  if (!validateDob(dob) {
    this.setCustomValidity("Age must be between 18 and 55 years.");
    
  } else {
    this.setCustomValidity("");
  }
});





let entries = JSON.parse(localStorage.getItem('entries')) || [];

addrows();

document.querySelector('form').addEventListener('submit', function(event) {
  const form = event.target;
  if (!form.checkValidity()) {
    event.preventDefault(); // stop only if invalid
    return;
  }

  // Form is valid → proceed
  event.preventDefault(); // you still want to stop default so you can handle manually

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

  function addrow( entry){
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
    entries.forEach(entry => {
      addrow(entry);
    });
  }
