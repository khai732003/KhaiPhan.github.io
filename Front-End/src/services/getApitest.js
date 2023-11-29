import { useEffect, useState } from 'react';
import List from './list';

function Api() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    List()
      .then(items => {
        if(mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])

  return(
    <div className="wrapper">
     <h1>My Grocery List</h1>
     <ul>
       {list.map(item => <li key={item.id}>{item.name}</li>)}
     </ul>
   </div>
  )
}

export default Api;