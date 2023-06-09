<template>
    <div class="container">
        <link rel="stylesheet" href="../assets/app.css">
        <div v-for="beer in sortedBeers" :key="beer.id" class="beer-card">
            <div class="beer-image">
                <img :src="beer.image_url" :alt="beer.name" />
            </div>
            <div class="beer-info">
                <h2>{{ beer.name }}</h2>
                <p>{{ beer.tagline }}</p>
                <p>{{ beer.description }}</p>
                <p>ABV: {{ beer.abv }}</p>
                <p>IBU: {{ beer.ibu }}</p>
                <p class="warning" v-if="wordVerification(beer, 'lactose')">Contains Lactose⚠</p>
                <p class="highlight" v-if="wordVerification(beer, 'dry hop')">Dry Hopped</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            // initialize empty beers array
            beers: []
        };
    },
    // Component is mounted on the DOM
    async mounted() {
        try {
            // http get request using Axios to fetch data from the provided API.
            const response = await axios.get('https://api.punkapi.com/v2/beers?brewed_after=11-2012');
            // Then is stored in the beers array
            this.beers = response.data;
        } catch (error) {
            // show in the console if there is an error
            console.error(error);
        }
    },
    computed: {
        sortedBeers() {
            return this.beers
                // filter the beer by using the ! operator which changes the sense of the expression, now it will return true if the beers do not contain Centennial Hops, in this way we can remove it
                .filter(beer => !this.wordVerification(beer, 'centennial'))
                // create the ascending sorting using the .sort() method
                .sort((a, b) => a.abv - b.abv);
        }
    },
    methods: {
        // function to verify the words in order to avoid repetition. pass and received two parameters, beer parameter and a word that is being defined before depending on the needs
        wordVerification(beer, word){
            // convert all the JSON file into a string so it can check the word needed and returns a boolean value that can be used after.
            return JSON.stringify(beer).toLowerCase().includes(word)
        }
    }
};
</script>