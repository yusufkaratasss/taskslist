function openPopup() {
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
function openPopup2() {
  document.getElementById('popup2').style.display = 'block';
}
function closePopup2() {
  document.getElementById('popup2').style.display = 'none';
}

function chechbox() {
  var checkbox = document.getElementById("kullanici");
  var selectis2 = document.getElementById("selectis2");
  var updateBtn = document.getElementById("updateChangesBtn");
  var saveBtn = document.getElementById("saveChangesBtn");
  var selectis3 = document.getElementById("selectis3");
  var input = document.getElementById("input2");

  if (checkbox.checked) {
    // Checkbox işaretli ise
    updateBtn.style.display = "none";
    saveBtn.style.display = "block";
    selectis2.style.display = "block";
    selectis3.style.display = "none";
    input.style.display = "block";  
  } else {
    // Checkbox işaretli değil ise
    updateBtn.style.display = "block";
    saveBtn.style.display = "none";
    selectis2.style.display = "none";
    selectis3.style.display = "block";  
    input.style.display = "none";  
  }
}


function saveUserData() {
  const taskTypeId = document.getElementById('select2').value;
  const username = document.getElementById('username').value;
  const birthdate = document.getElementById('birthdate').value;
  const tc = document.getElementById('tc').value;
  const usersId = document.getElementById('select3').value;
  const text = document.getElementById('text').value;
  
  fetch("http://127.0.0.1:10000/register2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usersId,
        username,
        tc,
        birthdate,
        taskTypeId,
        text
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
  
      openPopup2();

      const cells = row.getElementsByTagName('td');
    
      document.getElementById('select4').value = cells[0].textContent;
    
      document.getElementById('username2').value = cells[4].textContent;
    
      document.getElementById('tc2').value = cells[6].textContent;
    
      document.getElementById('birthdate2').value = cells[5].textContent;
    
      document.getElementById('text1').value = cells[7].textContent;
    
      const saveBtn = document.getElementById('saveChangesBtn2');
    
      saveBtn.onclick = function () {
    
        updateUserData(row);
    
      };
    
    
    }
    
    function updateUserData(row) {

      const taskTypeId = document.getElementById('select4').value;
     
       const username = document.getElementById('username2').value;
     
       const birthdate = document.getElementById('birthdate2').value;
    
       const tc = document.getElementById('tc2').value;
     
       const text = document.getElementById('text1').value;
    
 
   
       const cells = row.getElementsByTagName('td');

       const _id = cells[2].textContent;
       
       const _id2 = cells[3].textContent;
       
       cells[1].textContent = taskTypeId;
     
       location.reload();
       
       cells[4].textContent = username;
       
       cells[5].textContent = birthdate;
     
       location.reload();
      
       cells[6].textContent = tc;
       
       cells[7].textContent = text;
       
       
       fetch(`http://127.0.0.1:10000/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },  
          body: JSON.stringify({
              taskTypeId: taskTypeId,
              username: username,
              birthdate: birthdate,
              tc: tc,
              text: text,
              _id:_id,
              _id2:_id2
          }),
    })
    console.log(taskTypeId)
    .then((response) => response.json())
    .then((data) => {
        if (data.message === "Veri başarıyla kaydedildi") {
            console.log("Veri başarıyla güncellendi.");
            closePopup2();
        } else {
            alert("Güncelleme sırasında bir hata oluştu.");
        }
    })
    .catch((error) => {
        console.error("Güncelleme sırasında bir hata oluştu.", error);
        location.reload();
        closePopup2();
    });
}


// Ekleme

function saveUserData2() {
  
  const taskTypeId = document.getElementById('select2').value;
  const usersId = document.getElementById('select3').value;
  const username = document.getElementById('username').value;
  const birthdate = document.getElementById('birthdate').value;
  const tc = document.getElementById('tc').value;
  const text = document.getElementById('text').value;

  fetch("http://127.0.0.1:10000/register3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTypeId,
        usersId,
        username,
        birthdate,
        tc,
        text,
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

// Kullanıcı silme işlemi
function Delete(row) {
  
  const confirmation = confirm("Bu Görevi silmek istediğinizden emin misiniz?");

  if (confirmation) {
    
    const tasksId = row.getElementsByTagName('td')[2].textContent;
    
    row.parentNode.removeChild(row);
    
      location.reload();
    
      alert("İşleminiz başarıyla gerçekleşti.");
    
    fetch(`http://127.0.0.1:10000/delete3`, {
      method: "DELETE",
    headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
          _id:tasksId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error("Görev silinirken bir hata oluştu.", error);
      });
  }
}



document.addEventListener("DOMContentLoaded", () => {
    
      fetch("http://127.0.0.1:10000/listing2")
    
      .then(response => response.json())
    
      .then(data => {
    
        const tableBody2 = document.getElementById("tableBody2");
    
        data.forEach(item => {
    
          const row = document.createElement("tr");
    
          row.onclick = function () {
    
            editEntry(this);
    
          };
          
            const taskTypeIdCell = document.createElement("td");
    
            const taskTypeId2Cell = document.createElement("td");
    
            const _idCell = document.createElement("td");
    
            const usersIdCell = document.createElement("td");

            const usernameCell = document.createElement("td");
    
            const tcCell = document.createElement("td");
    
            const birthdateCell = document.createElement("td");
    
            const textCell = document.createElement("td");
    
            const updateCell = document.createElement("td");
          
            taskTypeIdCell.textContent = item.taskTypeId._id;

            taskTypeId2Cell.textContent = item.taskTypeId.description;
              
            _idCell.textContent = item._id;
           
            usersIdCell.textContent = item.usersId._id;

            usernameCell.textContent = item.usersId.username;
    
            tcCell.textContent = item.usersId.tc;
    
            birthdateCell.textContent = item.usersId.birthdate;
    
            textCell.textContent = item.text;
          
            updateCell.innerHTML = '<button onclick="editEntry(this.parentNode.parentNode)" style="margin-left: 5px; font-size: 9px;"></i> Güncelle </button>'+ 
                                   '<button onclick="Delete(this.parentNode.parentNode)" style="margin-left: 5px; font-size: 10px;"></i> Sil </button>'
          
            row.appendChild(taskTypeIdCell);
    
            row.appendChild(taskTypeId2Cell);
    
            row.appendChild(_idCell);
           
            row.appendChild(usersIdCell);

            row.appendChild(usernameCell);
    
            row.appendChild(birthdateCell);
    
            row.appendChild(tcCell);
    
            row.appendChild(textCell);
    
            row.appendChild(updateCell);
          
            tableBody2.appendChild(row);
          
            const selectElement = document.getElementById("select");
    
            const option = document.createElement("option");
    
            option.value = item._id;
    
            option.textContent = item.usersId.username;
    
            option.birthdate = item.usersId.birthdate;
    
            selectElement.appendChild(option);
    
          });
    
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });
    });
    
    // Mevcut kayıtlar
    function populateForm() {
    
      const selectElement = document.getElementById("select");
      const selectElement2 = document.getElementById("select3");
    
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const selectedOption2 = selectElement2.options[selectElement2.selectedIndex];

      const selectedRecordId = selectedOption.value;
      const selectedRecordId2 = selectedOption2.value;

    
      fetch(`http://127.0.0.1:10000/currentuser`)
    
      .then((response) => response.json())
    
      .then((data) => {
    
        var selectedRecord2 = data.find((element) => element._id == selectedRecordId);

        var selectedRecord3 = data.find((element) => element._usersId == selectedRecordId2);

        console.log(selectedRecord3)
        
        const selectedRecord = {
    
          username: selectedRecord3.username,
    
          tc: selectedRecord3.tc,
    
          birthdate: selectedRecord3.birthdate,
    
    
        };
    
        document.getElementById("username").value = selectedRecord.username;
    
        document.getElementById("tc").value = selectedRecord.tc;
    
        document.getElementById("birthdate").value = selectedRecord.birthdate;
    
      })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
    
    // görev tipi
    document.addEventListener("DOMContentLoaded", () => {
      fetch("http://127.0.0.1:10000/listing3")
          .then(response => response.json())
          .then(data => {
              const selectElement = document.getElementById("select2");
              const selectElement2 = document.getElementById("select4");
  
              data.forEach(item => {
                  const option = document.createElement("option");
                  option.value = item._id;
                  option.textContent = item.description;
  
                  selectElement.appendChild(option);
  
                  const option2 = document.createElement("option");
                  option2.value = item._id;
                  option2.textContent = item.description;
  
                  selectElement2.appendChild(option2);
              });
          })
          .catch(error => {
              console.error("An error occurred:", error);
          });
  });
  
  function populateForm2() {
      const selectElement = document.getElementById("select2");
      const selectElement2 = document.getElementById("select4");
  
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const selectedOption2 = selectElement2.options[selectElement2.selectedIndex];
  
      const selectedRecordId = selectedOption.value;
      const selectedRecordId2 = selectedOption2.value;
  
      fetch(`http://127.0.0.1:10000/currentuser2`)
          .then((response) => response.json())
          .then((data) => {
              // Guncelleme kısmı
              var selectedRecord3 = data.find((element) => element._id == selectedRecordId2);
              document.getElementById("description").value = selectedRecord3.description;
  
              // Ekle kısmı
              const selectedRecord4 = data.find((element) => element._id == selectedRecordId);
              document.getElementById("description").value = selectedRecord4.description;
          })
          .catch((error) => {
              console.error("An error occurred:", error);
          });
  }
  

    // kullanıcı listesi

    document.addEventListener("DOMContentLoaded", () => {
      fetch("http://127.0.0.1:10000/listing")
    
      .then(response => response.json())
    
      .then(data => {
    
        const tableBody3 = document.getElementById("tableBody2");
    
          data.forEach(item => {
    
            const row = document.createElement("tr");
          
            tableBody3.appendChild(row);
          
            const selectElement = document.getElementById("select3");
                        
            const option = document.createElement("option");
    
            option.value = item._id;
    
            option.textContent = item.username;

            selectElement.appendChild(option);
                
          });
    
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });
    });


    function populateForm3() {
    
      const selectElement = document.getElementById("select3");

      const selectedOption = selectElement.options[selectElement.selectedIndex];
    
      const selectedRecordId = selectedOption.value;
    
      fetch(`http://127.0.0.1:10000/users`)
    
      .then((response) => response.json())
    
      .then((data) => {

        var selectedRecord2 = data.find((element) => element._id == selectedRecordId);
        
        if (selectedRecord2) {
    
          const selectedRecord = {
    
            username: selectedRecord2.username,

            birthdate: selectedRecord2.birthdate,

            tc: selectedRecord2.tc,

            _id: selectedRecord2._id,
    
          };
    
          document.getElementById("username").value = selectedRecord.username;

          document.getElementById("birthdate").value = selectedRecord.birthdate;

          document.getElementById("tc").value = selectedRecord.tc;

        } else {
    
          console.error("Görev tipi bulunamadı");
    
        }
    
      })
    
      .catch((error) => {
    
        console.error("An error occurred:", error);
    
      });
    }