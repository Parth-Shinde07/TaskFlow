      document.querySelector(".signup-form").addEventListener("submit",function(e){
        e.preventDefault();

        const email=document.getElementById("email").value.trim();
        const password=document.getElementById("password").value.trim();
        const confirmPassword=document.getElementById("confirm-password").value.trim();

        if(!email||!password||!confirmPassword){
          alert("Please fill all the fields");
          return;
        }

        if(confirmPassword!=password){
          alert("Password do not match");
          return;
        }

        //redirect to dashboard
        window.location.href="dashboard.html";
      });