import ChatWrapper from "@/components/Chat/ChatWraper"
import Cookies from 'js-cookie';
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const Page = async() => {
  const user = Cookies.get("user");
  const authToken = Cookies.get("authToken");
  console.log(user)
  console.log(authToken)
  // const data = await getData()
  // console.log(data) 

  return (
    <div>
        <ChatWrapper/>
    </div>
  )
}

export default Page

async function getData() {
  
  const user = Cookies.get("user");
  const authToken = Cookies.get("authToken");

  if (!user || !authToken) {
    throw new Error("User or authToken not found in cookies");
  }

  const res = await fetch(`http://${serverUrl}/api/user/messages/${user}_Payoneer/`, {
    headers: {
      Authorization: `Bearer ${authToken.token.access}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
