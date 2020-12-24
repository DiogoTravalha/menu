const initialState = {
  name: '',
  token: '',
  address: '',
}

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload.token }
      break
    case 'SET_NAME':
      return { ...state, name: action.payload.name }
      break
    case 'ADD_ADDRESS':
      return {
        ...state,
        address: action.payload.address,
        city: action.payload.city,
        number: action.payload.number,
      }
      break
  }

  return state
}
