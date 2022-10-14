import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

const goodAction = {
  type: 'GOOD'
}
const okAction = {
  type: 'OK'
}
const badAction = {
  type: 'BAD'
}
const resetAction = {
  type: 'ZERO'
}
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

describe('unicafe reducer', () => {

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, goodAction)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  describe('when stats are incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(initialState, goodAction)
    const newerState = counterReducer(newState, okAction)
    const newestState = counterReducer(newerState, badAction)
    expect(newestState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })

    test('stats are reset', () => {
      const resetState = counterReducer(newestState, resetAction)
      expect(resetState).toEqual({
        good: 0,
        ok: 0,
        bad: 0
      })
    })
  })
})