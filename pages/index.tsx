async function test() {
  await fetch('/api/users', { method: 'GET' })
    .then((res) => res.json)
    .then((data) => console.log(data));
}
export default function Home() {
  return (
    <div>
      <button type="button" onClick={test}>
        test
      </button>
    </div>
  );
}
