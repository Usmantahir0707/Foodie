import { useNavigate } from "react-router-dom";
import cuisines from "../../cuisineData.js";
export default function CuisineFlex() {
  const navigate = useNavigate()
  return (
    <div className="scrollbar-hide flex gap-5 overflow-x-auto overflow-y-hidden p-1 whitespace-nowrap">
      {cuisines.map((x) => (
        <div
         onClick={()=> navigate('/search-result', { state: { query: x.title } })}
          className="flex w-[90px] flex-shrink-0 flex-col items-center"
          key={x.title}
        >
          <img
            className="aspect-square w-full rounded-md object-cover"
            src={x.img}
            alt={x.title}
          />
          <h4 className="mt-1 text-[17px] text-[#e21b70]">{x.title}</h4>
        </div>
      ))}
    </div>
  );
}
