
import {  Row, Col } from '@/components/ReactBootstrap';

;
import MobileCanvas from './MobileCanvas';
import Sidebar from './Sidebar';
import Chatbody from './Chatbody';

const ChatWrapper= () => {
  
  return (
    <div >
    <Row >
    <Col md={3} className='m-0 p-0'><Sidebar/></Col>
    <Col md={9} className='m-0 p-0'>
        <div className='w-100  d-block d-md-none absoluteCanvas'>
        <MobileCanvas/>
        </div>
        <div className='w-100 h-100 ChatLayout' >
            <Chatbody/>
        </div>
    </Col>

</Row>
    </div>
  );
};




export default ChatWrapper;