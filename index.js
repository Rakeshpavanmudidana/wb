window.onload = function () {
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  document.getElementById('dob').setAttribute('min', minDate.toISOString().split('T')[0]);
  document.getElementById('dob').setAttribute('max', maxDate.toISOString().split('T')[0]);
}

let entries = JSON.parse(localStorage.getItem('entries')) || [];

addrows();

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('toggle').checked ? 'true' : 'false';

    
    
    entries.push({
      name,
      email,
      password,
      dob,
      acceptedTerms
    });

    localStorage.setItem('entries', JSON.stringify(entries));
    
    addrow({
      name,
      email,
      password,
      dob,
      acceptedTerms
    });
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
