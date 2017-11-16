module.exports = [
  {
    path: '/api/test1',
    methods: 'get',
    handler (req) {
      return {
        code: 0,
        codeMsg: 'success',
        data: null
      }
    }
  }
]
