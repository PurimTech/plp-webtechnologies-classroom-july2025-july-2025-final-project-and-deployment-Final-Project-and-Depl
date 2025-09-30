// main.js - Interactive JS using getElementById & querySelector (no jQuery)
// Handles navigation, interactivity, and form validation

document.addEventListener("DOMContentLoaded", function() {
  // Smooth scroll for nav links
  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        const target = document.querySelector(this.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Mobile nav toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("hidden");
    });
  }

  // Image slider (carousel)
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  if (totalSlides > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // auto-change every 5s
  }

  // Form validation (contact form)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      let valid = true;
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name.length < 3) {
        alert("Name must be at least 3 characters long");
        valid = false;
      }

      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        valid = false;
      }

      if (message.length < 10) {
        alert("Message must be at least 10 characters");
        valid = false;
      }

      if (valid) {
        alert("Form submitted successfully! We will get back to you soon.");
        contactForm.reset();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // ... your other init code ...

  const form = document.getElementById("bill-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const unitsInput = document.getElementById("units");
      const resultDiv = document.getElementById("bill-result");

      const units = parseFloat(unitsInput.value);
      if (isNaN(units) || units <= 0) {
        resultDiv.textContent = "⚠️ Enter a valid number of units (kWh).";
        return;
      }

      // ----- Token pricing model (example) -----
      const baseRate = 28.00;             // KES per kWh (energy charge)
      const surchargeRate = 0.45;         // KES per kWh (fuel & others)
      const fixedCharge = 200.00;         // Fixed charge (KES)
      const VATpercent = 0.16;             // 16% VAT

      // Energy charge
      const energyCharge = units * baseRate;
      // Surcharge
      const surcharge = units * surchargeRate;
      // Subtotal before fixed and VAT
      let subtotal = energyCharge + surcharge + fixedCharge;
      // VAT on energy + surcharge (not always on fixed, depending on regulation)
      const vatAmount = (energyCharge + surcharge) * VATpercent;
      // Final total
      const totalKES = subtotal + vatAmount;

      // Format result
      const formatted = totalKES.toLocaleString("en-KE", {
        style: "currency",
        currency: "KES"
      });

      // Build output text
      resultDiv.innerHTML = `
        <strong>Estimated Token Bill: ${formatted}</strong><br>
        Units (kWh): ${units.toFixed(2)}<br>
        Energy @ KES ${baseRate.toFixed(2)}: KES ${(energyCharge).toFixed(2)}<br>
        Surcharges @ KES ${surchargeRate.toFixed(2)}: KES ${surcharge.toFixed(2)}<br>
        Fixed charge: KES ${fixedCharge.toFixed(2)}<br>
        VAT (16%): KES ${vatAmount.toFixed(2)}
      `;
    });
  }

  // ... any other init code ...
});

document.addEventListener("DOMContentLoaded", function () {
  const quickForm = document.getElementById("quick-bill-form");
  const quickResult = document.getElementById("quick-bill-result");

  if (quickForm) {
    quickForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const lastAmount = parseFloat(document.getElementById("last-amount").value);
      const periodDays = parseInt(document.getElementById("period-days").value);

      if (isNaN(lastAmount) || isNaN(periodDays) || lastAmount <= 0 || periodDays <= 0) {
        quickResult.textContent = "⚠️ Please enter valid values for both fields.";
        quickResult.hidden = false;
        return;
      }

      // Estimate daily consumption
      const dailyCost = lastAmount / periodDays;
      const monthlyEstimate = dailyCost * 30; // project to 30 days
      const yearlyEstimate = dailyCost * 365;

      quickResult.innerHTML = `
        💡 Estimated daily cost: <strong>KES ${dailyCost.toFixed(2)}</strong><br>
        📅 Estimated monthly bill: <strong>KES ${monthlyEstimate.toFixed(2)}</strong><br>
        📆 Estimated yearly bill: <strong>KES ${yearlyEstimate.toFixed(2)}</strong>
      `;
      quickResult.hidden = false;
    });
  }
});
