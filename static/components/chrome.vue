<script>
    module.exports = {
        data: function () {

            return {
                title: 'Pear Commerce - Connecting Shoppers To The Products and Retailers They Love.',
                theme: 'default'
            };
        },
        //insert the following code for vue-meta to work
        metaInfo() {
            return {
                title: this.title,
                meta: []
            }
        },
        mounted() {
            console.log(this);
            this.theme = (this.$children && this.$children[0].theme) || 'default';
        }
    };
</script>

<template>
   @@include('html/chrome.html')
</template>

<style scoped>

    .vc_custom_contact {
        padding-top: 12% !important;
        padding-right: 12% !important;
        padding-bottom: 12% !important;
        padding-left: 12% !important;
        border-radius: 10px !important;
    }

</style>
