// Clickjacking defence for a static host that cannot send X-Frame-Options:
// if this page is loaded inside another site's frame, break out of it.
(function(){
  try {
    if (window.top !== window.self) { window.top.location = window.self.location; }
  } catch (e) {
    // Cross-origin top frame: hide the page rather than let it be framed.
    document.documentElement.style.display = "none";
  }
})();
