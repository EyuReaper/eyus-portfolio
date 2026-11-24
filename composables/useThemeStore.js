import { ref, onMounted } from 'vue';

const isDarkMode = ref(false); // NVG (night vision) mode
const isLightMode = ref(false); // Daylight mode; never on together with NVG
let sfxAudio = null; // Declare sfxAudio globally for composable

const applyLightModeClass = (isLight) => {
  if (import.meta.client) {
    document.documentElement.classList.toggle('light', isLight);
  }
};

const toggleLightMode = () => {
  isLightMode.value = !isLightMode.value;
  if (isLightMode.value && isDarkMode.value) {
    isDarkMode.value = false;
    applyDarkModeClass(false);
    localStorage.setItem('darkMode', false);
  }
  applyLightModeClass(isLightMode.value);
  localStorage.setItem('lightMode', isLightMode.value);
};

// Applies the .dark class to the <html> element for Tailwind's dark: prefix
const applyDarkModeClass = (isDark) => {
  if (import.meta.client) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

const toggleDarkMode = () => {
  // Play sound only if switching from light mode (Biometric Eye is pressed)
    if (sfxAudio && !isDarkMode.value) {
      sfxAudio.currentTime = 0;
      sfxAudio.play();
    }
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value && isLightMode.value) {
      isLightMode.value = false;
      applyLightModeClass(false);
      if (import.meta.client) localStorage.setItem('lightMode', false);
    }

    // Create a "Power On" flicker effect on the whole page
    if (import.meta.client) {
      const body = document.body;
      body.style.animation = 'none';
      body.offsetHeight; /* trigger reflow */
      // Intensity increases during activation
      body.style.animation = 'nvg-power-on 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    applyDarkModeClass(isDarkMode.value);
    if (import.meta.client) {
      localStorage.setItem('darkMode', isDarkMode.value);
    }
};

export function useThemeStore() {
  onMounted(() => {
    // Initialize sound effect if not already initialized
    if (!sfxAudio && import.meta.client) {
      // Import the sound file within the composable to avoid client/server issues
      import('~/assets/Splinter_Cell_Sfx.wav').then(module => {
        sfxAudio = new Audio(module.default);
      });
    }

    // 1. Theme Initialization
    if (import.meta.client) {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        isDarkMode.value = JSON.parse(savedDarkMode);
      } else {
        // Default to light mode (false) if no preference is saved
        isDarkMode.value = false;
        localStorage.setItem('darkMode', false); // Save this preference
      }
      applyDarkModeClass(isDarkMode.value);

      const savedLight = localStorage.getItem('lightMode');
      isLightMode.value = savedLight !== null && JSON.parse(savedLight) && !isDarkMode.value;
      applyLightModeClass(isLightMode.value);
    }
  });

  return {
    isDarkMode,
    toggleDarkMode,
    isLightMode,
    toggleLightMode,
  };
}
