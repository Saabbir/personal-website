/**
 * Theme (light/dark) state synced with html.dark and localStorage.
 * Inline script in app.html sets the initial class before paint; this composable
 * keeps Vue in sync and provides toggle.
 */
const STORAGE_KEY = "color-mode";

export function useTheme() {
  const isDark = ref(
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  function toggle() {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem(STORAGE_KEY, isDark.value ? "dark" : "light");
  }

  function setTheme(mode: "light" | "dark") {
    isDark.value = mode === "dark";
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem(STORAGE_KEY, mode);
  }

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains("dark");
  });

  return { isDark, toggle, setTheme };
}
