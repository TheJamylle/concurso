<template>
    <div id="json">
        <h1>AAAAAAAAAAAAA</h1>
        {{ dt }}
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "contest",
    el: '#json',
    data () {
        return {
        dt: null
        }
    },
    mounted () {
        axios
        .get('https://localhost:7777/area/')
        .then(response => (this.dt = response))
    }
}
</script>

<style>

</style>

