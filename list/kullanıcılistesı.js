function openPopup() {
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function validateUserData( username, tc, birthdate ) {
  if ( !username || !tc ||  !birthdate ) {
    return false;
  }
  return true;
}

function saveUserData() {
  const username = document.getElementById('username').value;
  const birthdate = document.getElementById('birthdate').value;
  const tc = document.getElementById('tc').value;


  if (!validateUserData( username, tc, birthdate )) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }
location.reload()
  fetch("http://127.0.0.1:10000/register4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        birthdate,
        tc,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Veri başarıyla kaydedildi") {
        console.log("Veri başarıyla kaydedildi.");
        closePopup();
        location.reload();
      } else {
        alert("Bu kullanıcı adı zaten kullanılıyor.");
      }
    })
    .catch((error) => {
      console.error("Bu kullanıcı adı zaten kullanılıyor.", error);
      closePopup();
    });
}

function editEntry(row) {
     
    openPopup();
  
    const cells = row.getElementsByTagName('td');
  
    document.getElementById('username').value = cells[1].textContent;
  
    document.getElementById('tc').value = cells[3].textContent;
  
    document.getElementById('birthdate').value = cells[2].textContent;
  
    const saveBtn = document.getElementById('saveChangesBtn');
  
    saveBtn.textContent = 'Güncelle';
  
    saveBtn.onclick = function () {
  
      updateUserData(row);
  
    };
  
  }
  
  function updateUserData(row) {
  
    const username = document.getElementById('username').value;
  
    const birthdate = document.getElementById('birthdate').value;
  
    const tc = document.getElementById('tc').value;
  
    if (!validateUserData( username, tc, birthdate )) {
  
      alert("Lütfen tüm alanları doldurun.");
  
      return;
  
    }
    const cells = row.getElementsByTagName('td');
   
    const taskTypeId = cells[0].textContent;
   
    cells[1].textContent = username;
  
    cells[2].textContent = birthdate;
     
    cells[3].textContent = tc;
    

     fetch(`http://127.0.0.1:10000/update3`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify({
            username: username,
            birthdate: birthdate,
            tc: tc,
            _id:taskTypeId
        }),
  })

  .then((response) => response.json())

  .then((data) => {

    if (data.message === "Veri başarıyla kaydedildi") {

        console.log("Veri başarıyla güncellendi.");

        closePopup();

    } else {

        alert("Güncelleme sırasında bir hata oluştu.");

    }

})
  .catch((error) => {
      console.error("Güncelleme sırasında bir hata oluştu.", error);
      closePopup();
  });
}

// Kullanıcıyı silme


  function Delete(row) {
    const confirmation = confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?");
  
    if (confirmation) {
      const userId = row.getElementsByTagName('td')[0].textContent;
      
      row.parentNode.removeChild(row);

      fetch(`http://127.0.0.1:10000/delete`, {
        method: "DELETE",
      headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify({
            _id:userId
        }),
  })
        .then((response) => response.json())
        .then((data) => {
          location.reload()
          if (data.success) {
            console.log("Kullanıcı başarıyla silindi.");
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Kullanıcı silinirken bir hata oluştu.", error);
        });
    }
  }
  

document.addEventListener("DOMContentLoaded", () => {

    fetch("http://127.0.0.1:10000/listing")
      
  .then(response => response.json())
  
  .then(data => {

    const tableBody2 = document.getElementById("tableBody2");
      data.forEach(item => {
  
          const row = document.createElement("tr");
          
          const idCell = document.createElement("td");
          
          const usernameCell = document.createElement("td");
  
          const birthdateCell = document.createElement("td");

          const tcCell = document.createElement("td");
    
          const updateCell = document.createElement("td");   
        
          idCell.textContent = item._id;

          usernameCell.textContent = item.username;
  
          birthdateCell.textContent = item.birthdate;
  
          tcCell.textContent = item.tc;
          
          updateCell.innerHTML = '<button onclick="editEntry(this.parentNode.parentNode)" style="margin-left: 5px; font-size: 10px;"></i>Güncelle</button>'+ 
                                 '<button onclick="Delete(this.parentNode.parentNode)" style="margin-left: 5px; font-size: 10px;"></i>Sil</button>' 
                                 
          row.appendChild(idCell);
          
          row.appendChild(usernameCell);
  
          row.appendChild(birthdateCell);
  
          row.appendChild(tcCell);

          row.appendChild(updateCell);


              tableBody2.appendChild(row);
          });
      })
      .catch(error => {
          console.error("An error occurred:", error);
      });
});
