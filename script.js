let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar");
let navLinks = navBar.querySelectorAll("li");

hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
  navLinks.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.toggle("fa-times");
  });
});

// Select all checkboxes
const checkboxes = document.querySelectorAll(".filter-checkbox");
const showAllCheckbox = document.querySelector("#show-all");

// Select all gallery items
const galleryItems = document.querySelectorAll(".gallery-item");

// Add event listeners to checkboxes
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (checkbox === showAllCheckbox) {
      toggleShowAll(); // Handle the "Show All" checkbox
    } else {
      handleIndividualSelection(checkbox); // Handle individual checkbox click
    }
    filterGallery();
  });
});

// Function to filter the gallery
function filterGallery() {
  const selectedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked && checkbox !== showAllCheckbox) // Exclude "Show All"
    .map((checkbox) => checkbox.value);

  // Show or hide gallery items
  galleryItems.forEach((item) => {
    const itemCategory = item.classList[1]; // Second class is the category
    if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
      item.style.display = "block"; // Show item
    } else {
      item.style.display = "none"; // Hide item
    }
  });
}

// Function to toggle all checkboxes when "Show All" is clicked
function toggleShowAll() {
  const isChecked = showAllCheckbox.checked;
  checkboxes.forEach((checkbox) => {
    if (checkbox !== showAllCheckbox) {
      checkbox.checked = false; // Uncheck all individual checkboxes
    }
  });
  if (isChecked) {
    // If "Show All" is checked, show all images
    galleryItems.forEach((item) => (item.style.display = "block"));
  }
}

// Function to handle individual checkbox selection
function handleIndividualSelection(selectedCheckbox) {
  // Uncheck "Show All" if an individual checkbox is selected
  showAllCheckbox.checked = false;

  // Deselect all other checkboxes except the one clicked
  checkboxes.forEach((checkbox) => {
    if (checkbox !== selectedCheckbox && checkbox !== showAllCheckbox) {
      checkbox.checked = false;
    }
  });
}

// Ensure all checkboxes are unselected at the start, but show all images
checkboxes.forEach((checkbox) => {
  checkbox.checked = false; // Uncheck all
});
galleryItems.forEach((item) => {
  item.style.display = "block"; // Show all images
});

// Initialize the filter to ensure the gallery matches the default checkbox state
filterGallery();
