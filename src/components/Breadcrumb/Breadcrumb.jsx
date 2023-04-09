import { Link } from "react-router-dom";
import './Breadcrumb.css'

function Breadcrumb(props) {
  const { items } = props;
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          const link = isLastItem ? null : item.link;
          const label = isLastItem ? item.label : (
            <Link to={item.link}>{item.label}</Link>
          );
          return (
            <li
              key={item.label}
              className={`breadcrumb-item${isLastItem ? " active" : ""}`}
              aria-current={isLastItem ? "page" : null}
            >
              {label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
export default Breadcrumb