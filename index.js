
// const dobInput = document.getElementById("dob");
// const today = new Date();

// // Max date = today - 18 years (accurate to day/month/year)
// const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

// // Min date = today - 55 years (accurate to day/month/year)
// const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

// // Convert to YYYY-MM-DD and set attributes
// dobInput.max = formatDate(maxDate);
// dobInput.min = formatDate(minDate);

// console.log("Min Date:", dobInput.min);
// console.log("Max Date:", dobInput.max);



function validateDate( dobInput )
{
  const value = new Date(dobInput.value);
  const today = new Date();

  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

  if (value > maxDate || value < minDate) {
    dobInput.setCustomValidity("Age must be between 18 and 55 years.");
    return false;
  } else {
    dobInput.setCustomValidity(""); // Clear message
    return true;
  }

}




let entries = JSON.parse(localStorage.getItem('entries')) || [];

addrows();

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dobInput = document.getElementById('dob');
    const dob = dobInput.value;
    const acceptedTerms = document.getElementById('toggle').checked ? 'true' : 'false';
    if ( validateDate( dobInput ) )
    {
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
    }
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
