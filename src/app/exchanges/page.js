/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import ChatWrapper from "@/components/Chat/ChatWraper"
import BuyOrder from "@/components/multisteporder/BuyOrder"
import SellOrder from "@/components/multisteporder/SellOrder"
import AuthContext from "@/context/AuthContext"
import PrivateRoute from "@/helper/PrivateRoute"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { useContext } from "react"

const page = () => {
  
const searchParams = useSearchParams()
  const search = searchParams.get('page')
  // console.log(search)

  const {chatdata,authTokens,user, ordermassage} = useContext(AuthContext)

  const [messages, setMessages] = useState(chatdata);
 
      

  useEffect(() => {
   
    if (authTokens && user) {
      const socket  = new WebSocket(
      `wss://${serverUrl}/ws/chat/${user?.name}/Payoneer/?${authTokens?.token.access}`
    );

    socket.addEventListener('open', () => {
      console.log('WebSocket connection established.');
    });

    socket.addEventListener('message', (event) => {
      const message = event.data;
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed.');
    });

    if (socket){
      socket.send(JSON.stringify({ message: ordermassage }));
    }

    
   

    return () => {
      socket.close();
    };}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  
  

  return (
    <PrivateRoute>
        <Link href={'/exchanges?page=sell'}>Sell</Link>
        <Link href={'/exchanges?page=buy'}>Buy</Link>
        {search==='sell'&&<SellOrder/>}
        {search==='buy'&&<BuyOrder/>}
        
        
        
        
        </PrivateRoute>
  )
}

export default page