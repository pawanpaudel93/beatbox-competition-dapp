// import Moralis from 'moralis/types'

Moralis.Cloud.define('selectWinners', async (request) => {
  const requestCopy = JSON.parse(JSON.stringify(request))
  const creator = requestCopy.user.ethAddress
  const contractAddress = requestCopy.params.contractAddress
  const Competition = Moralis.Object.extend('Competition')
  const query = new Moralis.Query(Competition)
  query.equalTo('contractAddress', contractAddress)
  query.equalTo('creator', creator)
  const competition = await query.first()
  if (competition && requestCopy.params.query) {
    Moralis.bulkUpdate('Wildcard', requestCopy.params.query, {
      useMasterKey: true,
    })
  } else {
    throw new Error('You are not the creator of this competition')
  }
})

Moralis.Cloud.define('judgeSelectWinners', async (request) => {
  if (!request.user)
    throw new Error('You must be logged in to use this function')
  const requestCopy = JSON.parse(JSON.stringify(request))
  const userAddress = requestCopy.user.ethAddress
  const contractAddress = requestCopy.params.contractAddress
  const Judge = Moralis.Object.extend('Judge')
  const query = new Moralis.Query(Judge)
  query.equalTo('contractAddress', contractAddress)
  query.equalTo('userAddress', userAddress)
  const judge = await query.first()
  if (judge && requestCopy.params.query) {
    Moralis.bulkWrite('WildcardWinners', requestCopy.params.query)
  } else {
    throw new Error('You are not a judge')
  }
})

Moralis.Cloud.define('judgeVoteCount', async (request) => {
  const query = new Moralis.Query('WildcardWinners')
  query.equalTo('contractAddress', request.params.contractAddress)
  const distinct = await query.distinct('judgeAddress')
  return distinct.length
})
