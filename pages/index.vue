<template>
    <div class="container">
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
                <p v-if="containsLactose(beer)">Contains Lactose</p>
                <p v-if="isDryHopped(beer)">Dry Hopped</p>
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

                // called the function created below
                .filter(beer => !this.containsCentennialHops(beer))
                // create the ascending sorting using the .sort() method
                .sort((a, b) => a.abv - b.abv);
        }
    },
    methods: {
        // check if beers contain lactose and dry hop with the provided items
        containsLactose(beer) {
            return beer.ingredients && beer.ingredients.toString().includes('lactose');
        },
        // function to check if the beer object has a method property and if that method property has a twist property. If so, convert the value of twist to lower case and checks the result string includes 'dry hop'
        isDryHopped(beer) {
            return beer.method && beer.method.twist && beer.method.twist.toLowerCase().includes('dry hop');
        },
        // function to check if inside the ingredients property if there is a hops array with the name of Centennial, if there is, then the result will be true. use this function before in order to remove the centenial hops when filtering
        containsCentennialHops(beer) {
            return beer.ingredients && beer.ingredients.hops.some(hop => hop.name === 'Centennial');
        }
    }
};
</script>

<style>

/* div where everything is displayed, flex wrap in order to let the beers continue below when it does not fit in the screen */
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-evenly;
}

/* div where displays the information of each beer, is a card 
    adding bckg color and defining the width of the cards
*/
.beer-card {
    display: flex;
    width: 45%;
    background-color: lightgray;
    padding: 20px;
    border-radius: 20px;
}

/* defining the size of the beer img container and adding padding tot he right to make space between img and text */
.beer-image {
    width: 20%;
    margin-right: 20px;
}

/* beer img inside the beer container width */
.beer-image img {
    width: 100%;
}

/* container where all the text information is going to be displayed */
.beer-info {
    width: 70%;
}

.beer-info h2 {
    margin-top: 0;
}

.beer-info p {
    margin: 0;
}

@media screen and (max-width: 767px) {
    .beer-card {
        width: 100%;
        /* Full width on smaller screens */
    }
}
</style>