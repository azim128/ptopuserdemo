import Link from "next/link";


export default function NotFound() {
  return (
    <>
        <div className="px-5 d-flex justify-content-center align-items-center flex-cloumn w-100 text-light" style={{height:'100vh',background:"#010314"}}>
      <div className="px-4 py-5 my-5 text-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" style={{background:"#0f101e",padding:'10px 30px', borderRadius:'10px'}}>Return Home</Link>
      </div>
    </div>
      </>
  );
}
