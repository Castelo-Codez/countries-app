<script setup>
import {RouterLink} from "vue-router";
import {ref, onBeforeMount, onMounted, computed, watch} from "vue";
let ArrayOfWorld = ref([]);
onBeforeMount(() => {
    async function fetchData() {
        let data = await fetch("https://restcountries.com/v3.1/all");
        return data.json();
    }
    fetchData().then((data) => {
        data = data.map((count) => {
            if (count.population) {
                count.population = count.population
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            count.capital = count.capital || ["No Data"];
            count.capital = count.capital[0];
            return count;
        });
        window.localStorage.setItem("countries", JSON.stringify(data));
        data.map((country) => {
            return ArrayOfWorld.value.push(country);
        });
    });
});
onMounted(() => {
    const select = document.querySelector("select");
    select.addEventListener("change", (e) => {
        document.querySelector("#search-input").value = "";
        ArrayOfWorld.value = JSON.parse(
            window.localStorage.getItem("countries")
        );
        ArrayOfWorld.value = ArrayOfWorld.value.filter((el) => {
            if (e.target.value === "") {
                return el;
            } else {
                return el.region === e.target.value;
            }
        });
    });
});
onMounted(() => {
    const searchInput = document.querySelector("#search-input");
    searchInput.addEventListener("input", (e) => {
        ArrayOfWorld.value = JSON.parse(
            window.localStorage.getItem("countries")
        );
        ArrayOfWorld.value = ArrayOfWorld.value.filter((el) =>
            el.name.common.toUpperCase().includes(e.target.value.toUpperCase())
        );
    });
});
</script>
<template>
    <section class="content pt-10">
        <div class="container">
            <div class="head sm:flex sm:justify-between sm:items-center">
                <div
                    class="search-bar relative flex bg-bgclr1 dark:bg-cardclr pl-[50px] pt-[10px] pb-[10px] pr-[50px] rounded-md"
                >
                    <span
                        class="icon absolute dark:text-textclrDark left-[20px]"
                    >
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
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="search for a country"
                        class="dark:bg-cardclr bg-bgclr1 w-full dark:text-white block focus:outline-none placeholder:text-xs dark:caret-white placeholder:transition placeholder:duration-300 focus:placeholder:opacity-0"
                    />
                </div>
                <div>
                    <select
                        name="filter"
                        id="filter"
                        class="relative bg-bgclr1 mt-3 w-full sm:mt-3 sm:max-w-[auto] dark:bg-cardclr dark:text-textclrDark"
                    >
                        <option value="">All countries</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>
            <ul
                class="countries mt-8 grid grid-cols-1 sm:grid-cols-main gap-24"
                role="list"
                v-if="ArrayOfWorld.length > 0"
            >
                <li
                    class="item"
                    v-for="(coun, index) in ArrayOfWorld"
                    :key="index"
                >
                    <RouterLink
                        :to="{name: 'deepinfo', params: {id: coun.name.common}}"
                    >
                        <div class="image w-full h-[140px]">
                            <img
                                :src="coun.flags.png"
                                :alt="coun.flags.alt"
                                class="w-full h-full"
                            />
                        </div>
                        <div class="info p-5 dark:bg-cardclr bg-bgclr1">
                            <h4 class="dark:text-white">
                                {{ coun.name.common }}
                            </h4>
                            <ul class="list mt-4 text-sm" role="list">
                                <li
                                    class="info-container capitalize dark:text-white mb-1"
                                >
                                    popultaion: {{ coun.population }}
                                </li>
                                <li
                                    class="info-container capitalize dark:text-white mb-1"
                                >
                                    region: {{ coun.region }}
                                </li>
                                <li
                                    class="info-container capitalize dark:text-white mb-1"
                                >
                                    capital: {{ coun.capital }}
                                </li>
                            </ul>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </section>
</template>
<style lang="scss">
select {
    appearance: none;
    position: relative;
    &:focus {
        outline: none;
    }
    border: none;
    padding: {
        top: 10px;
        left: 10px;
        bottom: 10px;
        right: 50px;
    }
    option {
        padding: 10px;
    }
}
.countries {
    li {
        a {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            .image {
                img {
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }
            }
        }
    }
}
</style>
