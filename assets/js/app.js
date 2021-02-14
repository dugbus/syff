console.log("ready");

//var currentPath = window.location.pathname + window.location.search + window.location.hash;

document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function checkScroll() {
    var nav = document.getElementById("nav");
    if (window.pageYOffset != 0) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };
  document.body.classList.add("ready");
});

document.getElementById("copyright").innerHTML = new Date().getFullYear();

(function () {
  scrollTo();
})();

function scrollTo() {
  const links = document.querySelectorAll(".arrow");
  links.forEach((each) => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
  const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
  e.preventDefault();
  var targetID = respond
    ? respond.getAttribute("href")
    : this.getAttribute("href");
  const targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  const originalTop = distanceToTop(targetAnchor);
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
  const checkIfDone = setInterval(function () {
    const atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = "-1";
      targetAnchor.focus();
      window.history.pushState("", "", targetID);
      clearInterval(checkIfDone);
    }
  }, 100);
}
