// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // ---------------- PAGE 1 (index.html) ----------------

  const goBtn = document.getElementById("goBtn");
  // Get "Go" button (exists only on index.html)

  if (goBtn) {
    goBtn.addEventListener("click", () => {

      const secret = document.getElementById("secretInput").value;
      // Read secret key typed by user

      if (!secret) {
        alert("Enter a secret key");
        return;
        // Stop if input is empty
      }

      // Redirect browser to secret page
      // Secret key is passed in URL
      window.location.href = `/pad?key=${secret}`;
    });
  }

  // ---------------- PAGE 2 (pad.html) ----------------

  const saveBtn = document.getElementById("saveBtn");
  const textArea = document.getElementById("padText");

  // This runs only on pad.html
  if (saveBtn && textArea) {

    // Read secret key from URL (?key=abc)
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");

    // Load existing text from backend
    fetch(`/load?key=${key}`)
      .then(res => res.json())
      .then(data => {
        textArea.value = data.text;
        // Show saved text (if any)
      });

    // Save button logic
    saveBtn.addEventListener("click", () => {

      // Send secret key + text to backend
      fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: key,
          text: textArea.value
        })
      }).then(() => {
        alert("Saved");
      });
    });
  }

});
