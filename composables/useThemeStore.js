import { ref, onMounted, onUnmounted } from 'vue';

const isDarkMode = ref(false); // Global state
let sfxAudio = null; // Declare sfxAudio globally for composable

// Applies the .dark class to the <html> element for Tailwind's dark: prefix
const applyDarkModeClass = (isDark) => {
  if (process.client) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

const toggleDarkMode = () => {
  // Play sound only if switching from light mode (Biometric Eye is pressed)
  // Biometric Eye is displayed when isDarkMode is false.
  // So, if isDarkMode.value is currently false, we are pressing the Biometric Eye.
    if (sfxAudio && !isDarkMode.value) {
      sfxAudio.currentTime = 0; // Rewind to start for quick successive plays
      sfxAudio.play();
    }
    isDarkMode.value = !isDarkMode.value;
  
    // Create a "Power On" flicker effect on the whole page
    const body = document.body;
    body.style.animation = 'none';
    body.offsetHeight; /* trigger reflow */
    body.style.animation = isDarkMode.value ? 'nvg-power-on 0.5s steps(4)' : '';
    
    applyDarkModeClass(isDarkMode.value);  if (process.client) {
    localStorage.setItem('darkMode', isDarkMode.value);
  }
};

export function useThemeStore() {
  onMounted(() => {
    // Initialize sound effect if not already initialized
    if (!sfxAudio && process.client) {
      // Import the sound file within the composable to avoid client/server issues
      import('~/assets/Splinter_Cell_Sfx.wav').then(module => {
        sfxAudio = new Audio(module.default);
      });
    }

    // 1. Theme Initialization
    if (process.client) {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        isDarkMode.value = JSON.parse(savedDarkMode);
      } else {
        // Default to light mode (false) if no preference is saved
        isDarkMode.value = false;
        localStorage.setItem('darkMode', false); // Save this preference
      }
      applyDarkModeClass(isDarkMode.value);
    }
  });

  return {
    isDarkMode,
    toggleDarkMode,
  };
}