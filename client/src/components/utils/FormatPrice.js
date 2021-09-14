const toCurrency = price => {
    return new Intl.NumberFormat('en-IN', {
      currency: 'INR',
      style: 'currency'
    }).format(price)
  }

export default toCurrency;