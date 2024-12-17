document.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll('.info-text');
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
  
    function handleScroll() {
      paragraphs.forEach(paragraph => {
        if (isInViewport(paragraph)) {
          paragraph.classList.add('visible');
        } else {
          paragraph.classList.remove('visible'); // Reset the animation when out of view
        }
      });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run it once in case the element is already in view
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const textBlocks = document.querySelectorAll('.text-blk');
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
  
    function handleScroll() {
      textBlocks.forEach(textBlock => {
        if (isInViewport(textBlock)) {
          textBlock.classList.add('visible');
        } else {
          textBlock.classList.remove('visible'); // Optional: Reset animation when out of view
        }
      });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run it once in case the element is already in view
  });
  











  






  document.addEventListener("DOMContentLoaded", function() {
    const textParagraphs = document.querySelectorAll('#unique-text-container p');
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
  
    function handleScroll() {
      textParagraphs.forEach(paragraph => {
        if (isInViewport(paragraph)) {
          paragraph.classList.add('visible');
        } else {
          paragraph.classList.remove('visible'); // Optional: Reset animation when out of view
        }
      });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run it once in case the element is already in view
  });
  










  document.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll('#license .certification-description p');
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
  
    function handleScroll() {
      paragraphs.forEach(paragraph => {
        if (isInViewport(paragraph)) {
          paragraph.classList.add('fade-in-text', 'visible');
        } else {
          paragraph.classList.remove('fade-in-text', 'visible'); // Reset the animation when out of view
        }
      });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run it once in case the element is already in view
});







// about page code 
document.addEventListener("DOMContentLoaded", function() {
    // Select elements
    const heading = document.querySelector('#about-heading');
    const subheading = document.querySelector('#about-subheading');
    const lead = document.querySelector('#about-lead');
    const descriptions = document.querySelectorAll('#about-description');
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
  
    function handleScroll() {
      // Check visibility for individual elements
      if (isInViewport(heading)) {
        heading.classList.add('visible');
      } else {
        heading.classList.remove('visible');
      }
      
      if (isInViewport(subheading)) {
        subheading.classList.add('visible');
      } else {
        subheading.classList.remove('visible');
      }
  
      if (isInViewport(lead)) {
        lead.classList.add('visible');
      } else {
        lead.classList.remove('visible');
      }
  
      descriptions.forEach(description => {
        if (isInViewport(description)) {
          description.classList.add('visible');
        } else {
          description.classList.remove('visible');
        }
      });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run it once on page load
  });
  




  document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.text h2, .text h5, .text p');
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
  
    function handleScroll() {
      elements.forEach(element => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run it once on page load
  });
  












  document.addEventListener("DOMContentLoaded", function() {
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    function handleScroll() {
      const elementsToFadeIn = document.querySelectorAll('.info-text, .text-blk, #unique-text-container p, .fade-in-text, #license .certification-description p, #about-heading, #about-subheading, #about-lead, #about-description, .text h2, .text h5, .text p');

      elementsToFadeIn.forEach(element => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run it once on page load
});










