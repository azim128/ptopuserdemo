export default function Loading() {
    return (
      <>
        <div className="px-5 d-flex justify-content-center align-items-center flex-cloumn w-100" style={{height:'100vh',background:"#010314"}}>
          <div className="w-100 px-5" >
            <div className="skeleton">
              <div className="skeleton-left">
                <div className="line h17 w-100"></div>
                <div className="line"></div>
                <div className="line h8 w-100"></div>
                <div className="line  w-100"></div>
              </div>
              <div className="skeleton-right">
                <div className="square"></div>
              </div>
            </div>
            <div className="skeleton">
              <div className="skeleton-left">
                <div className="line  w-100"></div>
                <div className="line"></div>
                <div className="line  w-100"></div>
                <div className="line  w-100"></div>
              </div>
              <div className="skeleton-right">
                <div className="square"></div>
              </div>
            </div>
            <div className="skeleton">
              <div className="skeleton-left">
                <div className="line h17 w-100"></div>
                <div className="line"></div>
                <div className="line h8 w-100"></div>
                <div className="line  w-100"></div>
              </div>
              <div className="skeleton-right">
                <div className="square"></div>
              </div>
            </div>
          </div>
  
  
         
        </div>
      </>
    );
  }
  