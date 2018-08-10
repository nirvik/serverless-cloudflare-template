module.exports = {

	Redirect: (ctx, values) => {
      		const { redirectTo, statusCode } = values
      		ctx.response = Response.redirect(redirectTo, statusCode)
	},

	helloCloudflarian: (ctx, values) => {
		ctx.response = new Response('🔶  🔶  Hello Cloudflarian   🔶  🔶')
	},

	helloWorld: (ctx, values) => {
		ctx.response = new Response('Hello world !')
	},

	avery: async (ctx, values) => {
		const response = await fetch("https://averyharnish.us")
		ctx.response = response
	},

	bitcoin: async (ctx, values) => {
	    const init = {
	      method: 'GET',
	      headers: {'Authorization': 'XXXXXX'}
	    }
	    const [btcResp, ethResp, ltcResp] = await Promise.all([
	      fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot', init),
	      fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot', init),
	      fetch('https://api.coinbase.com/v2/prices/LTC-USD/spot', init)
	    ])
	  
	    const btc = await btcResp.json()
	    const eth = await ethResp.json()
	    const ltc = await ltcResp.json()
	  
	    let combined = {}
	    combined['btc'] = btc['data'].amount
	    combined['ltc'] = ltc['data'].amount
	    combined['eth'] = eth['data'].amount
	  
	    const responseInit = {
	      headers: {'Content-Type': 'application/json'}
	    }
	    ctx.response = new Response(JSON.stringify(combined), responseInit)
	}
}
