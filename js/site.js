/* SHARED SITE BEHAVIOR */

const pageSections = document.querySelectorAll(".page");

function showPage(pageId) {
  const targetPage = document.getElementById(pageId);

  if (!targetPage || !targetPage.classList.contains("page")) {
    return;
  }

  pageSections.forEach(function (page) {
    page.classList.remove("active");
  });

  targetPage.classList.add("active");
  closeDrawer();
  window.scrollTo(0, 0);

  document.dispatchEvent(
    new CustomEvent("cafe:pagechange", {
      detail: { pageId: pageId }
    })
  );
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}

function closeDrawer() {
  const drawer = document.getElementById("drawer");
  const menuToggle = document.getElementById("menuToggle");

  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

document.getElementById("menuToggle").addEventListener(
  "click",
  function () {
    const drawer = document.getElementById("drawer");
    const isOpen = drawer.classList.toggle("open");

    this.setAttribute("aria-expanded", isOpen);
    this.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    drawer.setAttribute("aria-hidden", !isOpen);

    if (isOpen) {
      drawer.querySelector("a").focus();
    }
  }
);

document.querySelectorAll(".drawer a").forEach(function (link) {
  link.addEventListener("click", closeDrawer);
});

document.addEventListener("click", function (event) {
  const drawer = document.getElementById("drawer");
  const menuToggle = document.getElementById("menuToggle");

  if (
    drawer.classList.contains("open") &&
    !drawer.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeDrawer();
  }
});

document.addEventListener("keydown", function (event) {
  const drawer = document.getElementById("drawer");

  if (event.key === "Escape" && drawer.classList.contains("open")) {
    closeDrawer();
    document.getElementById("menuToggle").focus();
  }
});

const galleryDialog = document.getElementById("galleryDialog");

if (galleryDialog) {
  const galleryImage = document.getElementById("galleryDialogImage");

  document.querySelectorAll(".gallery-grid button").forEach(function (button) {
    button.addEventListener("click", function () {
      const image = button.querySelector("img");
      galleryImage.src = image.src;
      galleryImage.alt = image.alt;
      galleryDialog.showModal();
    });
  });

  galleryDialog
    .querySelector(".gallery-dialog-close")
    .addEventListener("click", function () {
      galleryDialog.close();
    });

  galleryDialog.addEventListener("click", function (event) {
    if (event.target === galleryDialog) {
      galleryDialog.close();
    }
  });
}

window.CafeSite = {
  showPage: showPage,
  showToast: showToast
};
