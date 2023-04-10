import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

async function test() {
        await fetch('/api/users', {method: 'GET'})
        .then(res => res.json)
        .then(data => console.log(data));
      }
export default function Home() {
  return (
 <>
<div>
<button onClick={test}>
test
</button>
 </div>
        
</>
  )
}
