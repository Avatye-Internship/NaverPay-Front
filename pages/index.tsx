import Axios from 'axios';

async function test() {
  await Axios.patch('/api/users/find/pwd')
    .then((res) => res.data)
    .then((data) => console.log(data));
}
export default function Home() {
  return (
    <div>
      <button type="button" onClick={test}>test</button>
    </div>
  );
}
