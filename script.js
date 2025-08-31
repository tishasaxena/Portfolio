document.addEventListener('DOMContentLoaded', () => {
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Optional: close mobile menu after clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // ===== HIGHLIGHT ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-pink-500', 'font-semibold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-pink-500', 'font-semibold');
            }
        });
    });

    // ===== FORM SUBMISSION =====
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value;

            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);

            form.reset();
        });
    }

    // ===== ANIMATE SECTIONS ON SCROLL =====
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});


//Toogle Theme Mode
const html = document.documentElement;

// Desktop elements
const desktopToggle = document.getElementById('theme-toggle-desktop');
const desktopIcon = document.getElementById('mode-icon-desktop');
const desktopText = document.getElementById('mode-text-desktop');

// Mobile elements
const mobileToggle = document.getElementById('theme-toggle-mobile');
const mobileIcon = document.getElementById('mode-icon-mobile');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  html.classList.add('dark');
  desktopToggle.checked = true;
  mobileToggle.checked = true;
  desktopIcon.textContent = '☀️';
  desktopText.textContent = 'Light Mode';
  mobileIcon.textContent = '☀️';
} else {
  html.classList.remove('dark');
  desktopToggle.checked = false;
  mobileToggle.checked = false;
  desktopIcon.textContent = '🌙';
  desktopText.textContent = 'Dark Mode';
  mobileIcon.textContent = '🌙';
}

// Function to update theme
function toggleTheme(isDark) {
  html.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Update desktop
  desktopIcon.textContent = isDark ? '☀️' : '🌙';
  desktopText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  desktopToggle.checked = isDark;

  // Update mobile
  mobileIcon.textContent = isDark ? '☀️' : '🌙';
  mobileToggle.checked = isDark;
}

// Event listeners
desktopToggle.addEventListener('change', () => toggleTheme(desktopToggle.checked));
mobileToggle.addEventListener('change', () => toggleTheme(mobileToggle.checked));



//letter-by-letter animation effect for name
const nameText = "Tisha Saxena";
const nameElement = document.getElementById("typingName");
let i = 0;
function typeName() {
    if (i < nameText.length) {
        nameElement.textContent += nameText.charAt(i);
        i++;
        setTimeout(typeName, 200);
    }
}
typeName();


//Chatbot
function toggleChat() {
  const container = document.getElementById("chatbot-container");
  container.style.display = container.style.display === "none" ? "block" : "none";
}

const input = document.getElementById("chat-input");
const chatbox = document.getElementById("chatbox");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    const userMessage = input.value.trim();
    chatbox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    input.value = "";

    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    })
      .then(res => res.json())
      .then(data => {
        chatbox.innerHTML += `<div><strong>Bot:</strong> ${data.reply}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
      })
      .catch(err => {
        chatbox.innerHTML += `<div style="color:red;">⚠️ Error contacting bot.</div>`;
      });
  }
});


function toggleChat() {
  const bot = document.getElementById("chatbot-container");
  bot.classList.toggle("hidden");
}
