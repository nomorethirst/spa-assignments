import $ from 'jquery'
// import '../static/styles.css'
// import '../static/index.html'

const maxPrecision = 10
let total = 0
let addend = 1
let multiplier = 1.2
const multiplierCost = 10
const autoclickerCost = 100
let autoclickerCount = 0
let autoclickers = []

const init = () => {
  total = 0
  addend = 1
  multiplier = 1.2
  autoclickerCount = 0
  autoclickers = []
}

const clearState = () => {
  window.localStorage.removeItem('state')
}

const reset = () => {
  for (let autoclicker of autoclickers) {
    window.clearInterval(autoclicker)
  }
  clearState()
  init()
  updateTotal(0)
  updateAdder()
  updateMultiplier()
}

const saveState = () => {
  let state = {total, addend, multiplier, autoclickerCount}
  console.log('saving state: ', state)
  window.localStorage.setItem('state', JSON.stringify(state))
}

const restoreState = () => {
  let state = JSON.parse(window.localStorage.getItem('state'))
  if (state) {
    total = state.total
    addend = state.addend
    multiplier = state.multiplier
    autoclickerCount = state.autoclickerCount
    console.log('restoring state: ', state)
  }
  // for (let i = 0; i < autoclickerCount; i++) {
  //   console.log('adding autoclicker i = ', i)
  //   setInterval(() => {
  //     $('#adder').click()
  //   }, 1000)
  // }
}

const updateTotal = addendum => {
  total += addendum
  let fmtTotal = `${total}`.length > maxPrecision ? total.toPrecision(maxPrecision) : `${total}`
  $('#totalLabel').text(`Total: ${fmtTotal}`)
  if (total < multiplierCost) {
    $('#multiplier').css('pointer-events', 'none')
    $('#multiplier').css('background-color', 'grey')
  } else {
    $('#multiplier').css('pointer-events', 'auto')
    $('#multiplier').css('background-color', 'white')
  }
  if (total < autoclickerCost) {
    $('#autoclicker').css('pointer-events', 'none')
    $('#autoclicker').css('background-color', 'grey')
  } else {
    $('#autoclicker').css('pointer-events', 'auto')
    $('#autoclicker').css('background-color', 'white')
  }
  if (total === 0 && addend === 1 && multiplier === 1.2 && autoclickerCount === 0) {
    $('.headerButton').css('pointer-events', 'none')
    $('.headerButton').css('background-color', 'grey')
  } else {
    $('.headerButton').css('pointer-events', 'auto')
    $('.headerButton').css('background-color', 'white')
  }
}

const updateAdder = () => {
  let fmtAddend = `${addend}`.length > maxPrecision ? addend.toPrecision(maxPrecision) : `${addend}`
  $('#adder').text(`+${fmtAddend}`)
}

const updateMultiplier = () => {
  let fmtMultiplier = `${multiplier}`.length > maxPrecision ? multiplier.toPrecision(maxPrecision) : `${multiplier}`
  $('#multiplier').text(`*${fmtMultiplier}`)
}

const updateAutoclickerCount = () => {
  $('#autoclickerCountLabel').text(`Count: ${autoclickerCount}`)
}

$(document).ready(() => {
  restoreState()
  // update UI state
  updateTotal(0)
  updateAdder()
  updateMultiplier()

  $('#multiplier').on('click', () => {
    if (total >= multiplierCost) {
      addend *= multiplier
      updateAdder()
      updateTotal(-multiplierCost)
      saveState()
    }
  })
  $('#adder').on('click', () => {
    updateTotal(addend)
    saveState()
  })
  $('#autoclicker').on('click', () => {
    if (total >= autoclickerCost) {
      autoclickerCount++
      updateAutoclickerCount()
      updateTotal(-autoclickerCost)
      autoclickers.push(setInterval(() => {
        $('#adder').click()
      }, 1000))
      saveState()
    }
  })
  $('#resetButton').on('click', reset)
})
