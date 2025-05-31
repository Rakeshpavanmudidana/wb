
function isValidAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  const ageInMilliseconds = today - birthDate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  return ageInYears >= 18 && ageInYears <= 55;
}


const dobInput = document.getElementById("dob");
dobInput.addEventListener("input", function () {
  const value = new Date(this.value);
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

  if ( !isValidAge(value) {
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
