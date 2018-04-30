const fetcher = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.ok ? resolve(response.json()) : reject(response))
  })
}

// const fetcher = (url, options) => {
//   return fetch(url)
//     .then((response) => response.ok ? Promise.resolve(response.json()) : Promise.reject(response))
// }

export default fetcher
