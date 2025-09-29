import { Link } from "react-router-dom";
import data from "../../data";

export default function ResultFlex({query}) {

  function deepSearch(obj, term) {
  const lowerTerm = term.toLowerCase();

  // If obj is a string/number/boolean → check directly
  if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
    return String(obj).toLowerCase().includes(lowerTerm);
  }

  // If obj is an array → check any item inside
  if (Array.isArray(obj)) {
    return obj.some(item => deepSearch(item, term));
  }

  // If obj is an object → check any value
  if (obj && typeof obj === "object") {
    return Object.values(obj).some(value => deepSearch(value, term));
  }

  return false;
}

const filteredData = data.filter(item => deepSearch(item, query));


  
  return (
    <section role="All-Restaurants" className="mt-6 text-2xl font-[500]">
        <h2>{filteredData.length} {filteredData.length > 1 ? 'Restaurants' : 'Restaurant'}</h2>
    <div className="mt-4 flex flex-wrap justify-center gap-[60px]">
      {    
      filteredData.map((x, i) => (
        <Link className="flex justify-center" key={x.id} to={'/restaurant'} state={x.title}>
        <div
          key={i}
          className="flex w-[95%] bg-gray-100 flex-col gap-1 overflow-hidden rounded-md shadow-[0px_0px_5px_rgba(0,0,0,0.3)] md:w-[250px]"
        >
          <img className="w-full object-contain" src={x.assets.img} alt="" />
          <div
            role="title + rating container"
            className="flex justify-between px-[12px]"
          >
            <h1 className="text-[1.3rem] leading-normal font-[600]">
              {x.title}
            </h1>
            <div className="flex items-center justify-between gap-2">
              <i
                className="fa-solid fa-star text-[14px]"
                style={{ color: "#ffae00" }}
              ></i>{" "}
              <span className="text-[14px]">
                {x.assets.rating} <span className="text-gray-400">({x.assets.totalReviews})</span>
              </span>
            </div>
          </div>

          <div className="text-gray-400 text-[14px] px-[12px]">$ {x.cuisine}</div>
          <div className="text-gray-400 text-[14px] px-[12px] pb-[12px]">
            <i className="fa-solid fa-clock"></i>
            {''} {x.assets.time} - <i className="fa-solid fa-bicycle"></i>
            {''} <span className="text-[12px]">Rs.{x.assets.fee}</span>
          </div>
        </div>
        </Link>
      ))}
    </div>
     </section>
  )
}
  