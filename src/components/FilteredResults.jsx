import data from "../../data";

export default function FilteredResults({ filters, setFilters }) {
  return (
    <div>
      {/*clear all filters*/}
      <div>
        <button
          onClick={() =>
            setFilters({ sort: "", quickFilters: "", offers: "", price: "" })
          }
        >
          Back
        </button>
      </div>
    </div>
  );
}
