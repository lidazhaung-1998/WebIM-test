<template>
    <div>
        <div class="shitbg"></div>
        <div class="boxshit">吃屎啦你 ！</div>
    </div>
</template>

<script>
    export default {
        name: "me"
    }
</script>

<style scoped>
    .shitbg {
        margin: 0 auto;
        width: 5rem;
        height: 3.13rem;
        background-image: url("../../assets/img/eatshit.jpg");
        background-size: 100% 100%;
        -webkit-box-reflect: below 3px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.6)));
    }

    .boxshit {
        width: 100%;
        position: absolute;
        top: 7rem;
        text-align: center;
        -webkit-box-reflect: below 3px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.6)));
    }
</style>