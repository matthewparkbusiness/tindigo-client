const API_URL = "https://still-chamber-79686.herokuapp.com"

export const postData = async (url, data, token='') => {
  const response = await fetch(API_URL + url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    
  return await response.json() // parses JSON response into native JavaScript objects
}

export const getData = async (url, token='') => {
  const response = await fetch(API_URL + url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  })

  return await response.json()
}