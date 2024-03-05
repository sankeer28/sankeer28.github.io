window.onload = function() {
    var themeSwitch = document.querySelector('.ui-switch input');
    themeSwitch.addEventListener('change', function(event) {
        if (event.target.checked) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        }
    });
    window.location.reload();
}


    var nameElement = document.getElementById('name');
    nameElement.addEventListener('mouseover', function() {
        this.textContent = "I'm Sankeerthiken Nimalathas";
        this.classList.add('long-name');
    });

    var tiltImage = document.getElementById('tiltImage');

tiltImage.addEventListener('mousemove', function(e) {
    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left; // Mouse X position relative to the image
    var y = e.clientY - rect.top; // Mouse Y position relative to the image
    var dx = ((x / rect.width) - 0.5) * 2; // Difference between mouse X and center X
    var dy = ((y / rect.height) - 0.5) * 2; // Difference between mouse Y and center Y

    // Rotate the image around the X and Y axes
    // The rotation is proportional to the difference between the mouse position and the center of the image
    this.style.transform = 'rotateX(' + (-dy * 30) + 'deg) rotateY(' + (dx * 30) + 'deg)';


    
});

tiltImage.addEventListener('mouseout', function(e) {
    // Reset the image rotation when the mouse is not over the image
    this.style.transform = '';
});

document.getElementById('scroll-button').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


};


const btn = document.getElementById('btn');

function classAdd(){
 const nav = document.getElementById('nav');
  nav.classList.toggle('active');
}
 btn.addEventListener('click', classAdd);




// Check for saved 'mode' in localStorage
let mode = localStorage.getItem('mode');

const modeToggle = document.querySelector('#mode-toggle');

const enableDarkMode = () => {
  document.body.classList.add('dark-mode');
  document.body.classList.remove('light-mode');
  localStorage.setItem('mode', 'dark');
  modeToggle.checked = true; // Update the checkbox
}

const enableLightMode = () => {
  document.body.classList.add('light-mode');
  document.body.classList.remove('dark-mode');
  localStorage.setItem('mode', 'light');
  modeToggle.checked = false; // Update the checkbox
}

if (mode === 'dark') {
  enableDarkMode();
} else if (mode === 'light') {
  enableLightMode();
}

modeToggle.addEventListener('change', () => {
  // Check the state of the checkbox
  if (modeToggle.checked) {
    enableDarkMode();
  } else {  
    enableLightMode(); 
  }
});








 
