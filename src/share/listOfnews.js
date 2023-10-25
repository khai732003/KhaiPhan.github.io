

export default function listOfnews() {
  return (
    fetch('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/news').then(data => data.json())
  )
}
