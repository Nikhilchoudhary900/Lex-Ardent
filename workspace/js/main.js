(function () {
  var KEY = "lexardent_disclaimer_accepted";
  var modal = document.getElementById("disclaimer");
  var body = document.body;

  if (modal) {
    if (!localStorage.getItem(KEY)) {
      modal.classList.add("show");
      body.classList.add("blocked");
    }
    var agree = document.getElementById("agreeDisclaimer");
    if (agree) {
      agree.addEventListener("click", function () {
        localStorage.setItem(KEY, "true");
        modal.classList.remove("show");
        body.classList.remove("blocked");
      });
    }
  }

  var toggle = document.querySelector(".menu-toggle");
  var mobile = document.getElementById("mobileNav");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      mobile.classList.toggle("open");
    });
  }

  var searchBtn = document.querySelector("[data-search]");
  var overlay = document.getElementById("searchOverlay");
  if (searchBtn && overlay) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      overlay.classList.add("open");
      var input = overlay.querySelector("input");
      if (input) setTimeout(function () { input.focus(); }, 50);
    });
    var close = overlay.querySelector(".close-search");
    if (close) close.addEventListener("click", function () { overlay.classList.remove("open"); });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("open");
    });
  }

  function sendFormToWhatsApp(form) {
    var lines = ["Hello, I would like to discuss a legal matter with Hardik Mishra, Advocate.", ""];
    var labels = {
      name: "Name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      service: "Legal Service",
      position: "Position",
      message: "Message"
    };
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.disabled || el.type === "submit") return;
      var value = (el.value || "").trim();
      if (!value) return;
      lines.push((labels[el.name] || el.name) + ": " + value);
    });
    var url = "https://api.whatsapp.com/send?phone=919694009224&text=" + encodeURIComponent(lines.join("\n"));
    window.location.href = url;
  }

  document.querySelectorAll("form[data-local]").forEach(function (form) {
    if (form.getAttribute("data-wa-bound") === "1") return;
    form.setAttribute("data-wa-bound", "1");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      sendFormToWhatsApp(form);
    });
  });

  document.querySelectorAll(".nav-drop").forEach(function (drop) {
    drop.addEventListener("toggle", function () {
      if (drop.open) {
        document.querySelectorAll(".nav-drop").forEach(function (other) {
          if (other !== drop) other.removeAttribute("open");
        });
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-drop")) {
      document.querySelectorAll(".nav-drop").forEach(function (d) { d.removeAttribute("open"); });
    }
  });

  var googleIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';
  var googleReviews = [
    { initials: "KS", name: "Kavita Singh", when: "2 weeks ago", text: "Excellent counsel before the High Court. The team explained every step clearly and kept me updated throughout my writ petition." },
    { initials: "VK", name: "Vikram Khurana", when: "1 month ago", text: "Very professional NCLT representation. Hardik and the associates were prepared, prompt, and genuinely invested in the outcome." },
    { initials: "NJ", name: "Neha Joshi", when: "3 weeks ago", text: "They recovered my delayed flat through RERA with patience and precision. I always knew what was happening next." },
    { initials: "SA", name: "Sanjay Agarwal", when: "2 months ago", text: "Transparent fees, strong courtroom presence, and honest advice. Best law firm experience I have had in Jaipur." },
    { initials: "MB", name: "Meera Bansal", when: "5 weeks ago", text: "Consumer complaint resolved faster than I expected. Courteous staff and advocates who actually listen." },
    { initials: "RK", name: "Rajesh Khandelwal", when: "4 months ago", text: "Handled our company commercial contracts and a related dispute with complete command. Highly recommended." },
    { initials: "AP", name: "Aarti Palawat", when: "6 days ago", text: "Family court matter handled with dignity. They protected my interests without turning the case into unnecessary conflict." },
    { initials: "DS", name: "Deepak Soni", when: "3 months ago", text: "DRT proceedings were complicated, but Lex Ardent made the strategy simple. Regular updates and solid arguments." },
    { initials: "RM", name: "Rohit Mehta", when: "a month ago", text: "Lex Ardent handled my business dispute efficiently. Practical, transparent, and result-oriented. Highly recommended for corporate cases." },
    { initials: "PS", name: "Priya Sharma", when: "2 months ago", text: "Guided me through a sensitive family matter with compassion and clarity. Their professionalism gave me peace of mind." }
  ];

  function reviewCard(item) {
    return '<article class="g-review">' +
      '<div class="g-review-top"><div class="g-review-person"><div class="avatar">' + item.initials + '</div><div><strong>' + item.name + '</strong><small>' + item.when + '</small></div></div></div>' +
      '<div class="stars">★★★★★</div>' +
      '<p>"' + item.text + '"</p>' +
      '<span class="g-review-source">' + googleIcon + ' Posted on Google</span>' +
      '</article>';
  }

  document.querySelectorAll("[data-reviews-marquee]").forEach(function (host) {
    var cards = googleReviews.map(reviewCard).join("") + googleReviews.map(reviewCard).join("");
    host.classList.add("reviews-marquee");
    host.setAttribute("aria-label", "Google reviews scrolling continuously");
    host.innerHTML = '<div class="reviews-track">' + cards + "</div>";
  });
})();
