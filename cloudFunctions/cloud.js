Moralis.Cloud.define('selectWinners', async (request) => {
  if (request.params.query) {
    Moralis.bulkUpdate('Wildcard', request.params.query, {
      useMasterKey: true,
    })
  }
})
