function openPopup() {
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function validateUserData(description) {
  if (!description) {
    return false;
  }
  return true;
}

function saveUserData() {
  const description = document.getElementById('description').value;

  const taskTypeId = document.getElementById('taskTypeId').value;

  if (!validateUserData(description)) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  fetch("http://127.0.0.1:10000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        taskTypeId,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Veri başarıyla kaydedildi") {
        console.log("Veri başarıyla kaydedildi.");
        closePopup();
      } else {
        alert("Bu kullanıcı adı zaten kullanılıyor.");
      }
    })
    .catch((error) => {
      console.error("Bu kullanıcı adı zaten kullanılıyor.", error);
      closePopup();
    });
  location.reload();
}



function editEntry(row) {

  openPopup();

  const cells = row.getElementsByTagName('td');

  document.getElementById('description').value = cells[1].textContent;

  const savebutton = document.getElementById('saveChangesBtn');

  savebutton.textContent = 'Güncelle';

  savebutton.onclick = function () {

    updatetaskTypeData(row);

  };
}

function updatetaskTypeData(row) {

  const description = document.getElementById('description').value;

  if (!validateUserData(description)) {

    alert("Lütfen tüm alanları doldurun.");

    return;

  }

  const cells = row.getElementsByTagName('td');

  const taskTypeId = cells[0].textContent;

  fetch(`http://127.0.0.1:10000/update2`, {

      method: "PUT",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        description: description,

        _id: taskTypeId

      }),

    })

    .then((response) => response.json())

    .then((data) => {


      if (data.message === "Veri başarıyla kaydedildi") {

        console.log("Veri başarıyla güncellendi.");

        cells[1].textContent = description;

        closePopup();

      } else {

        alert("Güncelleme sırasında bir hata oluştu.");

      }

    })

    .catch((error) => {

      console.error("Güncelleme sırasında bir hata oluştu.", error);

      closePopup();

    });
};

// Kullanıcı silme

function Delete(row) {
  const confirmation = confirm("Bu Görev tipini silmek istediğinizden emin misiniz?");

  if (confirmation) {
    const tasktypeId = row.getElementsByTagName('td')[0].textContent;
    
    row.parentNode.removeChild(row);

    fetch(`http://127.0.0.1:10000/delete2`, {
      method: "DELETE",
    headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
          _id:tasktypeId
      }),
})
      .then((response) => response.json())
      .then((data) => {
        location.reload()
        if (data.success) {
          console.log("Görev tipi başarıyla silindi.");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Kullanıcı silinirken bir hata oluştu.", error);
      });
  }
}
// listing3

document.addEventListener("DOMContentLoaded", () => {

  fetch("http://127.0.0.1:10000/listing3")

    .then(response => response.json())

    .then(data => {

      const tableBody3 = document.getElementById("tableBody3");

      data.forEach(item => {

        const row = document.createElement("tr");

        const taskTypeIdCell = document.createElement("td");

        const descriptionCell = document.createElement("td");

        const updateCell = document.createElement("td");

        // a

        taskTypeIdCell.textContent = item._id;

        descriptionCell.textContent = item.description;

        updateCell.innerHTML = '<button onclick="editEntry(this.parentNode.parentNode)" style="margin-left: 5px; font-size: 9px;"></i>Güncelle</button>'+ 
                               '<button onclick="Delete(this.parentNode.parentNode)" style="margin-left: 5px; font-size: 9px;"></i>Sil</button>'
        
        // b        
        
        row.appendChild(taskTypeIdCell);

        row.appendChild(descriptionCell);

        row.appendChild(updateCell);

        tableBody3.appendChild(row);


      });

    })

    .catch(error => {

      console.error("An error occurred:", error);

    });

});