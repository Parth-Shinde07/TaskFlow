      document.querySelector(".signup-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "" || password === "") {
          alert("Please fill in all fields.");
          return;
        }

        //redirect to dashboard
        window.location.href = "dashboard.html";
      });