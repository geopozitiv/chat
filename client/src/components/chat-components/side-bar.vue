<template>
    <div>
        <sideBarTop/>
        <sideBarList/>
    </div>
</template>

<script>
import sideBarTop from './side-bar-top.vue'
import sideBarList from './side-bar-list.vue'

export default {
    name: 'sidebar',
    components: {
        sideBarTop,
        sideBarList
    },
    data() {
        return {
            show_form: false,
            new_chat_name: ''
        }
    }
}
</script>

<style scoped>
    .side_btn  {
        color: #E1CA96
    }
</style>