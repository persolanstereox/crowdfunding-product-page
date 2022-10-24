const aboutNavigation = document.querySelector('.nav-about');
const sectionAbout = document.querySelector('.donating');
const burgerBtn = document.querySelector('.burger');
const burgerLines = document.querySelectorAll('.line');
const navMenu = document.querySelector('ul');
const clickToScrollEl = document.querySelector('.test-scroll');
const openModalBtns = document.querySelectorAll('.open-modal');
const bookmarkBtn = document.querySelector('.btn-bookmark');
const spanBookmark = document.querySelector('.span-bookmark');
const money = document.querySelector('.backed-money');
const backers = document.querySelector('.backers');
const progressBar = document.querySelector('.progress');
const closeModalBtn = document.querySelector('.close-modal');
const modalLabelchoosePledge = document.querySelectorAll('.to-choose');
const radioBtnschoosePldge = document.querySelectorAll('.btn-choose-reward');
const formButton = document.querySelectorAll('.form-button');
const boxesEnterYourPledge = document.querySelectorAll('.choice-reward ');
const modalTypeRewardBox = document.querySelectorAll('.modal-type-reward');
const selectRewardBtns = document.querySelectorAll('.confirm-pledge');
const gotItBtn = document.querySelector('.display-changes');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalCompleted = document.querySelector('.modal-completed');
let bookmarkStorage = localStorage.getItem('bookmark') || 'bookmark';

const ProjectStats = {
  money: 89914,
  backers: 5007,
  daysLeft: 56,
  currency: 'USD',
  locale: 'en-US',
};
const BamboStand = {
  name: 'Bamboo Stand',
  scope: 101,
};
const BlackEditionStand = {
  name: 'Black Edition Stand',
  scope: 64,
};
const backOptions = [BamboStand, BlackEditionStand];

// Functions

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.querySelector('body').style.overflow = 'hidden';
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  document.querySelector('body').style.overflow = 'visible';
};

const displayEnterPledgeBox = function (i) {
  boxesEnterYourPledge.forEach(box => {
    if (!box.classList.contains('hidden')) {
      box.classList.add('hidden');
    }
  });

  if (i > 0) {
    document.getElementById(`choice-reward--${i}`).classList.remove('hidden');
    document
      .getElementById(`reward-executable--${i}`)
      .classList.add('selected-reward');
  }
};
const selectReward = function (rewardNum) {
  modalTypeRewardBox.forEach(modal => {
    modal.classList.remove('selected-reward');
  });
  document
    .getElementById(`reward-executable--${rewardNum}`)
    .classList.add('selected-reward');
  displayEnterPledgeBox(rewardNum);
  radioBtnschoosePldge.forEach(btn => {
    btn.classList.add('hidden');
  });
  radioBtnschoosePldge[rewardNum].classList.remove('hidden');
};

const updateStats = function (i) {
  const pledge = Number(document.getElementById(`pledge--${i}`).value);
  ProjectStats.money += pledge;
  ProjectStats.backers++;
  backOptions[i].scope--;
};
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
};
const displayUpdate = function (Stats) {
  console.log(Stats.money / 1000);
  const formattedBacked = formatCurrency(
    Stats.money,
    Stats.locale,
    Stats.currency
  );
  money.textContent = formattedBacked;
  backers.textContent = Stats.backers;
  document.querySelectorAll('.scope--0').forEach(scope => {
    scope.textContent = BamboStand.scope;
  });
  document.querySelectorAll('.scope--1').forEach(scope => {
    scope.textContent = BlackEditionStand.scope;
  });
  setTimeout(() => {
    progressBar.style.width = `${Stats.money / 1000}%`;
  }, 2000);
};

//Event Listneners

clickToScrollEl.addEventListener('click', function (e) {
  e.preventDefault();
  sectionAbout.scrollIntoView({ behavior: 'smooth' });
});

burgerBtn.addEventListener('click', function () {
  navMenu.classList.toggle('active');
  burgerLines.forEach(line => {
    line.classList.toggle('active');
  });
});

openModalBtns.forEach((btn, i) => {
  btn.addEventListener('click', function () {
    openModal();

    selectReward(i);
    this.blur();
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      burgerLines.forEach(line => {
        line.classList.remove('active');
      });
    }
  });
});

closeModalBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
bookmarkBtn.addEventListener('click', function () {
  if (bookmarkStorage === 'bookmark') {
    spanBookmark.textContent = 'Bookmarked';
    bookmarkStorage = 'bookmarked';
    this.classList.add('bookmarked');
  } else {
    spanBookmark.textContent = 'Bookmark';
    bookmarkStorage = 'bookmark';
    this.classList.remove('bookmarked');
  }
  localStorage.setItem('bookmark', bookmarkStorage);
});
if (bookmarkStorage === 'bookmarked') {
  bookmarkBtn.classList.add('bookmarked');
  spanBookmark.textContent = 'Bookmarked';
}

modalLabelchoosePledge.forEach((label, i) => {
  label.addEventListener('click', function (e) {
    e.preventDefault();
    selectReward(i);
  });
});
formButton.forEach((form, i) => {
  form.addEventListener('click', e => {
    e.preventDefault();
    selectReward(i);
  });
});

selectRewardBtns.forEach((btn, i) => {
  btn.addEventListener('click', function () {
    const minPledge = Number(
      document.getElementById(`pledge--${i}`).getAttribute('min')
    );
    const maxPledge = Number(
      document.getElementById(`pledge--${i}`).getAttribute('max')
    );
    const value = Number(document.getElementById(`pledge--${i}`).value);
    if (value >= minPledge && value <= maxPledge) {
      modal.classList.add('hidden');
      modalCompleted.classList.remove('hidden');

      updateStats(i);
      document.getElementById(`pledge--${i}`).value = '';
    }
  });
});
gotItBtn.addEventListener('click', () => {
  modalCompleted.classList.add('hidden');
  overlay.classList.add('hidden');
  document.querySelector('body').style.overflow = 'visible';
  displayUpdate(ProjectStats);
});
