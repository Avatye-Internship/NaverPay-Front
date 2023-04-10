// import { useRouter } from "next/router"
// export default function Id() {
//     const router = useRouter();
//     const id = Number(router.query.id)
//     return <div>
//         <h1>/pages/sub/[id].tsx</h1>
//         <p>Parameter id : {id}</p>
//         <a href="/">/pages/index.tsx</a>
//         </div>
// }

// export default function About() {
//     async function test() {
//       await fetch('http://localhost:3000/api/users/index', {method: 'GET'})
//       .then(res => res.json)
//       .then(data => console.log(data));
//     }
  
//     return <>
//      <div>
//   <button onClick={test}>
//       test
//     </button>
//     </div>
    
//     </>
   
    
//   }


// import { useEffect, useState } from "react";

// export default function Fetch() {
//     const [user, setUser] = useState({name: null})
//     useEffect(() => {
//         fetch(process.env.NEXT_PUBLIC_API_URL + 'api/hello')
//             .then(type=>type.json())
//             .then(result => {
//                 console.log(result)
//                 setUser(result)
//              })
//     })
//     return (<>
//     <h1>/pages/sub/fetch.tsx</h1>
//     <p>{user.name}</p>
//     <a href="/">/pages/index.tsx</a>
//     </>)
// }