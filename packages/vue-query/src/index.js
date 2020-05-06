const vueQueryMixin = {
  data() {
    const { queries } = this.$options;
    const _queries = {};
    for (const key in queries) {
      const query = queries[key]
      _queries[key] = null;
      const action = typeof query === 'function' ? query : query.action
      const exec = () => {
        action().then(data => {
          _queries[key] = data
        }).catch(console.log)
      }
      if (typeof query === 'object' && query.refetchInterval) {
        setInterval(exec, query.refetchInterval)
      }
      else {
        exec()
      }
    }

    return { _queries }
  },
  computed: {
    $queries() {
      return this.$data._queries;
    }
  },
}

const VueQuery = {
  install(Vue, options = {}) {
    Vue.mixin(vueQueryMixin)
  }
}

export default VueQuery;
export { VueQuery, vueQueryMixin }
