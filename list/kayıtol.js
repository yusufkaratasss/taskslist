document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const tc = document.getElementById("tc").value; 
        const birthdate = document.getElementById("birthdate").value;

        if (username.length < 3) {
            alert("Kullanıcı adı en az 3 karakter olmalıdır");
            return;
        }

        if (tc.length !== 11) {
            alert("TC kimlik numarası 11 haneli olmalıdır");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Şifre en az bir büyük harf, bir sayı ve en az 8 karakter içermelidir");
            return;
        }

        const userData = {
            username: username,
            password: password,
            birthdate: birthdate,
            tc: tc
        };

        try {
            let response = await fetch("http://127.0.0.1:10000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
        
            if (response.status === 400) {
                const result = await response.json();
                if (result.message === "Bu kullanıcı adı zaten kullanılıyor") {
                    alert("Bu kullanıcı adı zaten kullanılıyor");
                } else {
                    console.error("An error occurred:", result.message);
                }
            } else {
                alert("Başarılı bir şekilde kaydedildi");
                window.location.href = "girisyap.html";
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});