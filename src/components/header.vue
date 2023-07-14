<script setup>
import {onMounted, onBeforeMount, computed, ref} from "vue";
import {RouterLink} from "vue-router";
const theme =
    window.localStorage.getItem("theme") === "dark"
        ? ref("Light")
        : ref("Dark");
onBeforeMount(() => {
    document.documentElement.className = window.localStorage.getItem("theme");
});
onMounted(() => {
    
    const themeSwitcher = document.querySelector("#theme-switcher");
    themeSwitcher.addEventListener("change", (e) => {
        let checked = themeSwitcher.checked;
        function addtheme(themeMode) {
            document.documentElement.className = themeMode;
            window.localStorage.setItem(
                "theme",
                document.documentElement.className
            );
            themeMode === "dark"
                ? (theme.value = "Light")
                : (theme.value = "Dark");
        }
        if (checked) {
            addtheme("dark");
        } else {
            addtheme("light");
        }
    });
});
const checked = computed(() => {
    return window.localStorage.getItem("theme") === "dark";
});
</script>
<template>
    <header class="dark:bg-cardclr bg-bgclr1">
        <div class="container pt-2 pb-2 flex justify-between items-center">
            <RouterLink to="/">
                <h1 class="text-[20px] dark:text-textclrDark">
                    where is the world ?
                </h1>
            </RouterLink>
            <label
                for="theme-switcher"
                class="cursor-pointer flex items-center dark:text-textclrDark"
            >
                <input
                    type="checkbox"
                    role="switch"
                    id="theme-switcher"
                    class="hidden"
                    :checked="checked"
                />
                <span class="icon block p-1 mr-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                    </svg>
                </span>
                <span>{{ theme }} Mode</span>
            </label>
        </div>
    </header>
</template>
<style scoped lang="scss">
header {
    box-shadow: 6px -1px 3px #000;
}
</style>
