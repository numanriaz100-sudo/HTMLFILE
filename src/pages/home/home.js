<script>
  function subscribe(e) {
    e.preventDefault(); // stops page reload
    const email = document.getElementById("footer-field").value;

    if (email.trim() === "") {
      alert("Please enter a valid email!");
      return;
    }

    alert("Thank you for subscribing: " + email);
  }
</script>
