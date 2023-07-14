<script setup>
import {onBeforeMount, computed, ref, onMounted} from "vue";
import {useRoute} from "vue-router";
const route = useRoute();
const ArrayOfWorld = ref(JSON.parse(window.localStorage.getItem("countries")));
const countryId = computed(() => {
    return route.params.id;
});
const currrentCountry = computed(() => {
    return ArrayOfWorld.value.find((el) => el.name.common === countryId.value);
});
function back() {
    return history.back();
}
</script>
<template>
    <div v-if="currrentCountry" class="container mt-16" :key="route.params.id">
        <button
            class="back block w-fit py-2 px-10 rounded-md dark:text-textclrDark bg-bgclr1 dark:bg-cardclr"
            @click="back"
        >
            back
        </button>
        <div
            class="country-info flex flex-col lg:flex-row h-[300px] justify-between mt-10"
        >
            <div class="flag lg:w-[30%] h-full">
                <img
                    class="w-full h-full"
                    :src="currrentCountry.flags.png"
                    :alt="currrentCountry.flags.alt"
                />
            </div>
            <div
                class="deep-info lg:w-[60%] mt-10 sm:mt-0 flex flex-col justify-center"
            >
                <h3 class="country-name dark:text-textclrDark text-[40px]">
                    {{ currrentCountry.name.common }}
                </h3>
                <div class="more-info flex flex-col sm:flex-row mt-5">
                    <ul role="list" class="dark:text-textclrDark sm:w-[50%]">
                        <li class="info mb-3">
                            population: {{ currrentCountry.population }}
                        </li>
                        <li class="info mb-3">
                            Region: {{ currrentCountry.region }}
                        </li>
                        <li class="info mb-3">
                            Sub Region: {{ currrentCountry.subregion }}
                        </li>
                        <li class="info mb-3">
                            capital: {{ currrentCountry.capital }}
                        </li>
                    </ul>
                    <ul
                        role="list"
                        class="dark:text-textclrDark sm:w-[50%] mt-5 sm:mt-0"
                    >
                        <li class="info mb-3">
                            fifa: {{ currrentCountry.fifa }}
                        </li>
                        <li class="info mb-3 dark:text-textclrDark">
                            languages:
                            <span
                                class="text-xs"
                                v-for="(
                                    lang, index
                                ) in currrentCountry.languages"
                                >{{ lang }} {{ "" }}
                            </span>
                        </li>
                    </ul>
                </div>
                <ul
                    class="borders flex flex-wrap mt-10 dark:text-textclrDark"
                    v-if="currrentCountry.borders"
                >
                    <h4 class="dark:text-textclrDark block w-full">
                        boreders:
                    </h4>
                    <li
                        v-for="(border, index) in currrentCountry.borders"
                        :key="index"
                        class="p-2 bg-bgclr1 dark:bg-cardclr rounded-lg sm:w-[30%] md:w-[20%] lg:w-[10%] mr-2 mb-2 dark:text-textclrDark text-center"
                    >
                        {{ border }}
                    </li>
                </ul>
                <span v-else class="dark:text-textclrDark"
                    >borders: No Data</span
                >
            </div>
        </div>
    </div>
</template>
