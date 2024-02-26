import notFound from "../../assets/not.png";
import "./PageNotFound.scss";
function PageNotFound() {
  return (
    <div className="notFound">
      <h1>Page not found ☠️</h1>
      <img src={notFound} />
    </div>
  );
}

export default PageNotFound;
