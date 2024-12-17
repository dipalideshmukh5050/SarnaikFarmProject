function toggleSidebarUnique() {
    var sidebar = document.querySelector('.sidebar-unique');
    sidebar.classList.toggle('open');
  }

  function closeSidebarUnique() {
    var sidebar = document.querySelector('.sidebar-unique');
    sidebar.classList.remove('open');
  }

  function openCartSidebarUnique() {
    var cartSidebar = document.getElementById('cartSidebarUnique');
    cartSidebar.style.width = "300px";
  }

  function closeCartSidebarUnique() {
    var cartSidebar = document.getElementById('cartSidebarUnique');
    cartSidebar.style.width = "0";
  }


  function openCartSidebarUnique() {
    document.getElementById('cartSidebarUnique').classList.add('open');
  }

  function closeCartSidebarUnique() {
    document.getElementById('cartSidebarUnique').classList.remove('open');
  }










  document.addEventListener('DOMContentLoaded', function() {
    function toggleSidebarUnique() {
        const sidebar = document.querySelector('.sidebar-unique');
        const content = document.querySelector('.content-unique');
        if (sidebar && content) { // Check if elements exist
            sidebar.classList.toggle('open');
            content.classList.toggle('hidden');
        }
    }

    function closeSidebarUnique() {
        const sidebar = document.querySelector('.sidebar-unique');
        const content = document.querySelector('.content-unique');
        if (sidebar && content) { // Check if elements exist
            sidebar.classList.remove('open');
            content.classList.remove('hidden');
        }
    }

    const toggleButton = document.querySelector('.menu-toggle-unique');
    const closeButton = document.querySelector('.closebtn-unique');

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSidebarUnique);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeSidebarUnique);
    }
});























function startShakeCycle() {
  const button = document.querySelector('.user-entry');
  if (button) {
      // Add the shake-animation class to start shaking
      button.classList.add('shake-animation');

      // Remove the shake-animation class after 5 seconds to pause
      setTimeout(() => {
          button.classList.remove('shake-animation');
          // Add the shake-cycle class to keep shaking and pausing
          button.classList.add('shake-cycle');
      }, 5000); // 5 seconds
  }
}

// Call the function to start the shake cycle
startShakeCycle();
