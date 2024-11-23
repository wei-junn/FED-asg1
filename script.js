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

// Select form and error elements
const form = document.getElementById('contactForm');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Form submit event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  // Clear previous error messages
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';

  // Validate name
  const nameRegex = /^[A-Za-z\s]+$/; // Regular expression for alphabetic characters and spaces
  if (nameField.value.trim() === '') {
    nameError.textContent = 'Name is required';
    isValid = false;
  } else if (!nameRegex.test(nameField.value.trim())) {
    nameError.textContent = 'Name can only contain letters and spaces';
    isValid = false;
  }

  // Validate email
  if (emailField.value.trim() === '') {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else if (!validateEmail(emailField.value.trim())) {
    emailError.textContent = 'Invalid email address';
    isValid = false;
  }

  // Validate message
  if (messageField.value.trim() === '') {
    messageError.textContent = 'Message is required';
    isValid = false;
  }

  // If all fields are valid, simulate a successful submission
  if (isValid) {
    alert('Form submitted successfully!');
    window.location.href = 'index.html'; // Redirect to homepage
  }
});