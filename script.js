const loginInfo = {
  username: 'admin1',
  password: 'admin1234'
};
let adminState = localStorage.getItem('adminState') ? JSON.parse(localStorage.getItem('adminState')) : false;

const showPopupBtn = document.querySelector('.admin-login-btn');
const loginPopup = document.querySelector('.login-popup-wrapper');
const overlay = document.querySelector('.login-popup-wrapper .overlay');
const loginPopupClose = document.querySelector('.login-popup-wrapper .login-popup-close-btn');
const usernameEl = document.querySelector('.login-popup .username');
const passwordEl = document.querySelector('.login-popup .password');
const loginBtn = document.querySelector('.login-popup .login-btn');
const loginErrorEl = document.querySelector('.login-popup .login-error');
const adminBtns = document.querySelector('.admin-btns-container');
const addPageBtn = document.querySelector('.add-page-btn');
const addPagePopup = document.querySelector('.add-page-popup-wrapper');
const removePageBtn = document.querySelector('.remove-page-btn');
const removePagePopup = document.querySelector('.remove-page-popup-wrapper');
const book = document.querySelector('.book');

function adminStateInit() {
  if (adminState) {
    adminBtns.style.opacity = 1;
    adminBtns.style.pointerEvents = 'all';
    showPopupBtn.textContent = 'Log Out';
  };
  if (!adminState) {
    adminBtns.style.opacity = 0;
    adminBtns.style.pointerEvents = 'none';
    showPopupBtn.textContent = 'Admin Login';
  }
}
adminStateInit();

// Show and hide popup
showPopupBtn.addEventListener('click', () => {
  if (showPopupBtn.textContent === 'Log Out') {
    adminState = false;
    localStorage.setItem('adminState', JSON.stringify(adminState));
    adminStateInit();
  } else {
    loginPopup.style.opacity = 1;
    loginPopup.style.pointerEvents = 'all';
    usernameEl.value = '';
    passwordEl.value = '';
    usernameEl.focus();
    loginErrorEl.style.opacity = 0;
  }
});
overlay.addEventListener('click', () => {
  loginPopup.style.opacity = 0;
  loginPopup.style.pointerEvents = 'none';
});
loginPopupClose.addEventListener('click', () => {
  loginPopup.style.opacity = 0;
  loginPopup.style.pointerEvents = 'none';
});

// Login logic
loginBtn.addEventListener('click', () => {
  const username = usernameEl.value;
  const password = passwordEl.value;

  if (username === loginInfo.username && password === loginInfo.password) {
    loginErrorEl.style.opacity = 0;
    logInUser();
  } else {
    loginErrorEl.style.opacity = 1;
  }
});

// Prevent spacebar in input fields
function keyDown(e) {
  var e = window.event || e;
  var key = e.keyCode;
  //space pressed
  if (key == 32) { //space
    e.preventDefault();
  }
}

// Log in user
function logInUser() {
  // Close popup
  loginPopup.style.opacity = 0;
  loginPopup.style.pointerEvents = 'none';

  adminState = true;
  adminStateInit();
  localStorage.setItem('adminState', JSON.stringify(adminState));
}

// Adding page logic
addPageBtn.addEventListener('click', () => {
  addPagePopup.style.opacity = 1;
  addPagePopup.style.pointerEvents = 'all';
});

addPagePopup.querySelector('.overlay').addEventListener('click', () => {
  addPagePopup.style.opacity = 0;
  addPagePopup.style.pointerEvents = 'none';
});
addPagePopup.querySelector('.add-page-popup-close-btn').addEventListener('click', () => {
  addPagePopup.style.opacity = 0;
  addPagePopup.style.pointerEvents = 'none';
});

addPagePopup.querySelector('.add-page-popup-btn').addEventListener('click', () => {
  const imageLink = addPagePopup.querySelector('.image-link').value;
  const content = addPagePopup.querySelector('.content').value;

  if (pages.slice(-1)[0].length === 0) pages.pop();
  pages.push([imageLink, content]);
  localStorage.setItem('pages', JSON.stringify(pages));
  location.reload();
});

// Removing page logic
removePageBtn.addEventListener('click', () => {
  removePagePopup.style.opacity = 1;
  removePagePopup.style.pointerEvents = 'all';
});

removePagePopup.querySelector('.overlay').addEventListener('click', () => {
  removePagePopup.style.opacity = 0;
  removePagePopup.style.pointerEvents = 'none';
});
removePagePopup.querySelector('.remove-page-popup-close-btn').addEventListener('click', () => {
  removePagePopup.style.opacity = 0;
  removePagePopup.style.pointerEvents = 'none';
});

removePagePopup.querySelector('.remove-page-popup-btn').addEventListener('click', () => {
  const pageNum = removePagePopup.querySelector('input').value;

  if (pageNum > pages.length || pageNum < 1 || isNaN(pageNum)) {
    removePagePopup.querySelector('h1').textContent = 'Unable to remove page';
    return;
  }

  pages.splice(pageNum - 1, 1);
  localStorage.setItem('pages', JSON.stringify(pages));
  location.reload();
});

// ------------------------------Book Logic -----------------------------------
// Inserting Page Elements in HTML
function renderPages() {
  const storedPages = JSON.parse(localStorage.getItem('pages'));
  if (storedPages) {
    pages = storedPages;
  } else {
    pages = storedPages ? storedPages : pages;
  }

  pages.forEach((page, i) => {
    if (i % 2 === 0) {
      let html;
      if (i === pages.length - 1) {
        html =
          `
          <div id="p${Math.ceil(i / 2) + 1}" class="paper">
              <div class="front">
                <div id="f${Math.ceil(i / 2) + 1}" class="front-content">
                  <img src="${page[0]}" class="page-img">
                  <h1>${page[1]}</h1>
                  <p>${i + 1}</p>
                </div>
              </div>
              <div class="back">
              <div id="b${Math.ceil(i / 2)}" class="back-content">
                <p>${i + 2}</p>
              </div>
            </div>
          </div>
        `;
      } else {
        html =
          `
            <div id="p${Math.ceil(i / 2) + 1}" class="paper">
              <div class="front">
                <div id="f${Math.ceil(i / 2) + 1}" class="front-content">
                  <img src="${page[0]}" class="page-img">
                  <h1>${page[1]}</h1>
                  <p>${i + 1}</p>
                </div>
              </div>
          `;
      }
      book.insertAdjacentHTML('beforeend', html);
    } else {
      const html =
        `
          <div class="back">
              <div id="b${Math.ceil(i / 2)}" class="back-content">
                <img src="${page[0]}" class="page-img">
                <h1>${page[1]}</h1>
                <p>${i + 1}</p>
              </div>
            </div>
          </div>
        `;
      book.querySelector(`#p${Math.ceil(i / 2)}`).insertAdjacentHTML('beforeend', html);
    };
  });
}
renderPages();

// References to DOM elements
const prevBtn = document.querySelector('.prev-btn-container');
const nextBtn = document.querySelector('.next-btn-container');
const papers = document.querySelectorAll('.paper');

let indices = [];
function setZIndices() {
  for (let i = papers.length; i > 0; i--) {
    indices.push(i);
  }

  Array.from(papers).forEach((paper, i) => {
    paper.style.zIndex = indices[i];
  });
}
setZIndices();

// Event Listeners
prevBtn.addEventListener('click', goPrevPage);
nextBtn.addEventListener('click', goNextPage);


// Book Logic
let currentLocation = 1;
let numOfPapers = Math.ceil(pages.length / 2);
let maxLocation = numOfPapers + 1;

function openBook() {
  book.style.transform = 'translateX(50%)';
  prevBtn.style.transform = 'translateX(-210px)';
  nextBtn.style.transform = 'translateX(210px)';
}

function closeBook(isAtBeginning) {
  if (isAtBeginning) {
    book.style.transform = 'translateX(0%)';
  } else {
    book.style.transform = 'translateX(100%)';
  }

  prevBtn.style.transform = 'translateX(0px)';
  nextBtn.style.transform = 'translateX(0px)';
}

function goNextPage() {
  if (currentLocation < maxLocation) {

    if (currentLocation === 1) {
      openBook();
      papers[0].classList.add('flipped');
      papers[0].style.zIndex = numOfPapers;
    } else if (currentLocation === maxLocation - 1) {
      const lastPage = document.getElementById(Array.from(papers).slice(-1)[0].id);
      const secondLastPage = document.getElementById(Array.from(papers).slice(-2)[0].id);
      lastPage.classList.add('flipped');
      lastPage.style.zIndex = numOfPapers;
      secondLastPage.style.zIndex = numOfPapers - 1;
      closeBook();
    } else {
      const currentPage = document.getElementById(`p${currentLocation}`);
      const prevPage = document.getElementById(`p${currentLocation - 1}`);
      currentPage.classList.add('flipped');
      currentPage.style.zIndex = numOfPapers;
      prevPage.style.zIndex = numOfPapers - 1;
    }

    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    if (currentLocation === 2) {
      closeBook(true);
      const firstPage = document.getElementById(Array.from(papers).slice(0)[0].id);
      const secondPage = document.getElementById(Array.from(papers).slice(1)[0].id);
      const thirdPage = document.getElementById(Array.from(papers).slice(2)[0].id);
      firstPage.classList.remove('flipped');
      firstPage.style.zIndex = 3;
      secondPage.style.zIndex = 2;
      setZIndices();
    } else if (currentLocation === maxLocation) {
      const lastPage = document.getElementById(Array.from(papers).slice(-1)[0].id);
      const secondLastPage = document.getElementById(Array.from(papers).slice(-2)[0].id);
      lastPage.classList.remove('flipped');
      lastPage.style.zIndex = maxLocation.length;
      secondLastPage.style.zIndex = maxLocation.length - 1;
      openBook();
    } else {
      const currentPage = document.getElementById(`p${currentLocation}`);
      const prevPage = document.getElementById(`p${currentLocation - 1}`);
      prevPage.classList.remove('flipped');
      prevPage.style.zIndex = numOfPapers;
      currentPage.style.zIndex = numOfPapers - 1;
      Array.from(papers).forEach((paper, i) => {
        if (paper !== prevPage && i > currentLocation - 1) {
          paper.style.zIndex = indices[i];
        }
      });
    }

    currentLocation--;
  }
}