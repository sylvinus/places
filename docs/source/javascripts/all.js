/* global places */
/* eslint no-console: 0 */

places({
  container: document.querySelector('#landing-demo')
}).on('change', suggestion => console.log(suggestion));

// The following code is used to change the color of the navigation
// depending the level of page scroll.
const hero = document.querySelector('.hero-section');
const navigation = document.querySelector('.navigation');
const height = hero.offsetHeight;
const navHeight = navigation.offsetHeight;
const sidebar = document.getElementById('sidebar');


// automatically darken the top menu when going down
document.addEventListener('scroll', () => {
  const value = event.target.scrollingElement.scrollTop;
  const doc = document.querySelector('.documentation-section');

  if (doc) {
    let paddingDoc = window.getComputedStyle(doc, null).getPropertyValue('padding-top').split('px')[0];
    paddingDoc = parseInt(paddingDoc, 10);
    // Fix the sidebar navigation
    if (value > ((height - navHeight) + paddingDoc) && sidebar) {
      sidebar.classList.add('fixed');
    } else {
      sidebar.classList.remove('fixed');
    }
  }
});
// Responsive navigation
const theSelect = document.createElement('select');

function selectizer() {
   // Let's make the select
  var isSelect = document.getElementById('selectNav');
  theSelect.id = 'selectNav';
  theSelect.classList.add('display-on-small');

  if (!isSelect) {
    document.querySelector('.navigation').appendChild(theSelect);
  }

  const links = document.querySelectorAll('.menu li a');
  var home = document.createElement('option');
  home.text = 'Homepage';
  home.value = 'index.html';
  theSelect.appendChild(home);
  for (let i = 0; i < links.length; i++) {
    let option = document.createElement('option');
    option.text = links[i].textContent;
    option.value = links[i].href;
    theSelect.appendChild(option);
  }
}

window.onload = function() {
  selectizer();
};


theSelect.addEventListener('change', () => {
  var value = this.options[this.selectedIndex].value;
  window.location = value;
});
