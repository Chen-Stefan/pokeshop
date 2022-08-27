import linkedIn from "../assets/images/linkedin.png";
import github from "../assets/images/github.png";
import gmail from "../assets/images/gmail.png";

export default function Footer() {
  return (
    <div className="text-center mt-auto">
      <h6>Copyright &copy; Stefan's Pokemon Shop 2022</h6>
      <div>
        <a href="https://www.linkedin.com/in/stefan-chen/" target="_blank" rel="noreferrer"><img src={linkedIn} alt="twitter" width="50px" height="50px" /></a>
        <a href="https://github.com/Chen-Stefan" target="_blank" rel="noreferrer"><img src={github} alt="facebook" width="50px" height="50px" /></a>
        <a href="mailto:stefanchen9@gmail.com" target="_blank" rel="noreferrer"><img src={gmail} alt="instagram" width="60px"/></a>
      </div>
    </div>
  );
}
