'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
//const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
//const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  //overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
//modalCloseBtn.addEventListener("click", testimonialsModalFunc);
//overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// contact form
/*
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("[data-form]");
  const inputs = document.querySelectorAll("[data-form-input]");
  const submitButton = document.querySelector("[data-form-btn]");
  const messageDisplay = document.getElementById("form-message");

  // for each input field
  inputs.forEach(input => {
      input.addEventListener("input", () => {
          // check if all input fields have values
          const allFilled = [...inputs].every(input => input.value.trim() !== "");
          // enable button if all fields are filled
          submitButton.disabled = !allFilled;
      });
  });

  // email validation
  form.addEventListener("submit", function(event) {
      event.preventDefault(); // ensure script handles form submission

      const email = form.querySelector("input[name='email']").value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // something@domain.com

      // does the input email match the email format
      if (!emailPattern.test(email)) {
          messageDisplay.textContent = "Please enter a valid email address.";
          messageDisplay.style.color = "red"; // show error
          return;
      }

      // display success message and reset form
      messageDisplay.textContent = "Thank you! Your message has been sent.";
      messageDisplay.style.color = "green";
      form.reset();
      submitButton.disabled = true; // disable the button after form reset
  });
});



// conatct form submission
document.getElementById("message-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(this);
  const messageDisplay = document.getElementById("form-message");

  fetch('/send-email', {
      method: 'POST',
      body: JSON.stringify({
          fullname: formData.get('fullname'),
          email: formData.get('email'),
          message: formData.get('message')
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          messageDisplay.textContent = "Thank you! Your message has been sent.";
          messageDisplay.style.color = "green";
      } else {
          messageDisplay.textContent = "Error: " + data.error;
          messageDisplay.style.color = "red";
      }
  })
  .catch(error => {
      messageDisplay.textContent = "An error occurred while sending your message.";
      messageDisplay.style.color = "red";
  });
});*/



// dog api stuff
document.getElementById('fetch-dog-fact').addEventListener('click', fetchDogFact);
function fetchDogFact() {
  const factPromise = fetch('https://dog-api.kinduff.com/api/facts')
    .then(response => response.json())
    .then(data => {
      const fact = data.facts[0]; // get fact from response
      document.getElementById('dog-fact').textContent = fact;
    })
    .catch(error => {
      console.error('Error fetching dog fact:', error);
      document.getElementById('dog-fact').textContent = 'Failed to load a dog fact!';
    });

    // get dog image
    const imagePromise = fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        const dogImageElement = document.getElementById('dog-image');
        dogImageElement.src = imageUrl;
        dogImageElement.style.display = 'flex';
      })
      .catch(error => {
        console.error('Error fetching dog image:', error);
      });

  // wait for both API requests to complete
  Promise.all([factPromise, imagePromise]);
}

// cat api stuff
document.getElementById('fetch-cat-fact').addEventListener('click', fetchCatFact);
function fetchCatFact() {
  const factPromise = fetch('https://catfact.ninja/fact')
    .then(response => response.json())
    .then(data => {
      const fact = data.fact; // get fact from response
      document.getElementById('cat-fact').textContent = fact; // update HTML text
    })
    .catch(error => {
      console.error('Error fetching cat fact:', error);
      document.getElementById('cat-fact').textContent = 'Failed to load a cat fact!';
    });

  // get cat image
  const catImageElement = document.getElementById('cat-image');
  // direct link to image, uses timestamp to prevent caching
  catImageElement.src = `https://cataas.com/cat?${new Date().getTime()}`;
  catImageElement.style.display = 'flex';
}

// fox api stuff
document.getElementById('fetch-fox-fact').addEventListener('click', fetchFoxImg);
function fetchFoxImg() {
  const imagePromise = fetch('https://randomfox.ca/floof/')
    .then(response => response.json())
    .then(data => {
      const foxImageElement = document.getElementById('fox-image');
      foxImageElement.src = data.image;
      foxImageElement.style.display = 'flex';
    })
    .catch(error => console.error(error));
}

// bear api stuff
document.getElementById('fetch-bear-fact').addEventListener('click', fetchBearImg);
function fetchBearImg() {
  const bearImageElement = document.getElementById('bear-image');
  bearImageElement.src = `https://placebear.com/400/300?${new Date().getTime()}`;
  bearImageElement.style.display = 'block';
}

