import React from 'react'

export default function List() {
  return (
    fetch('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/products').then(data => data.json())
  )
}
