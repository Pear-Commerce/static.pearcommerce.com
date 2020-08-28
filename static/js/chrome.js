
const dataOverride = function(propName, _default) {
  let prop = this[propName];
  if (this.$children) {
    const childProp = null;
    this.$children.forEach((child) => {
      if (child.$el.id == 'eut-theme-content') {
        prop = child[propName];
      }
    });
  }
  return prop || _default;
};


module.exports = {
  data: function() {
    return {
      title: 'Pear Commerce - Connecting Shoppers To The Products and Retailers They Love.',
      theme: 'default',

    };
  },
  methods: {
    isPage(page) {
      return this.$route.path && page === this.$route.path.replace(/^\/|\/$/g, '');
    },
  },
  metaInfo() {
    return {
      title: dataOverride.bind(this)('title'),
      meta: [],
    };
  },
  mounted() {
    this.theme = dataOverride.bind(this)('theme', this.theme);
  },
  updated() {
    this.theme = dataOverride.bind(this)('theme', this.theme);
    if (window.EUTHEM) {
      EUTHEM.documentReady.init();
    }
  },
};
