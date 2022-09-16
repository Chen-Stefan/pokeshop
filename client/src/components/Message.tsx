import { Link } from "react-router-dom";
import pikachu from "../assets/images/pikachu.gif";

export const Message = ({ paymentMessage }: {paymentMessage: string}) => (
  paymentMessage ==='Your order has been placed!' ? 
  <div>
      <h3 className="text-center mt-5">{paymentMessage}</h3>
      <h5 className="text-center" style={{color: "green"}}>We will notify you when your order has shipped</h5>
      <Link to="/store">
       <button type="button">Continue</button>
     </Link>
      <div className="d-flex justify-content-center m-5">
        <img src={pikachu} style={{ width: "350px", height: "280px" }} />
      </div>
    </div> : 
    <><h3 className="text-center mt-5">{paymentMessage}</h3>
    <Link to="/store">
       <button type="button">Continue</button>
     </Link>
      <div className="d-flex justify-content-center m-5">
        <img src={pikachu} style={{ width: "350px", height: "280px" }} />
      </div></>
);