
const dataOverride = function(propName, _default) {
  return (this.$children && this.$children[0] && this.$children[0][propName]) || this[propName] || _default;
};

module.exports = {
  data: function() {
    return {
      title: 'Pear Commerce - Connecting Shoppers To The Products and Retailers They Love.',
      theme: 'default',
    };
  },
  metaInfo() {
    return {
      title: dataOverride.bind(this)('title'),
      meta: [],
    };
  },
  mounted() {
    this.theme = dataOverride.bind(this)('theme', 'default');
    console.log(this.$route);
    console.log(this.$route.name);
  },
};
