type FilterPanelProps = {
    onClose: () => void;
  };
  
  type FilterCheckboxProps = {
    id: string;
    name: string;
    value: string;
    label: string;
  };
  
  const skinConcerns = [
    "Acne + Blemish",
    "Combination",
    "Dark Spots + Hyperpigmentations",
    "Dryness",
  ];
  
  const skinTypes = ["All Skin Types", "Combination", "Dry", "Normal"];
  
  const FilterCheckbox = ({
    id,
    name,
    value,
    label,
  }: FilterCheckboxProps) => {
    return (
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-3 select-none"
      >
        <input
          id={id}
          name={name}
          value={value}
          type="checkbox"
          className="peer sr-only"
        />
  
        <span
          className="
            flex h-[18px] w-[18px] items-center justify-center border border-black bg-transparent
            [&_svg]:scale-75 [&_svg]:opacity-0 [&_svg]:transition-all [&_svg]:duration-200 [&_svg]:ease-out
            peer-checked:[&_svg]:scale-100 peer-checked:[&_svg]:opacity-100
          "
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none">
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
  
        <span className="text-[16px] leading-none">{label}</span>
      </label>
    );
  };
  
  const FilterPanel = ({ onClose }: FilterPanelProps) => {
    return (
      <aside
        className="fixed inset-0 z-[100] h-dvh w-full bg-stone-100 font-jost text-black md:hidden"
        aria-labelledby="filter-title"
      >
        <form className="flex h-full flex-col px-4 py-3">
          <header className="flex items-center justify-between">
            <h2 id="filter-title" className="text-lg font-medium">
              Filters
            </h2>
  
            <button
              type="button"
              onClick={onClose}
              className="text-lg font-medium"
              aria-label="Close filters"
            >
              Close
            </button>
          </header>
  
          <div className="mt-6 flex-1 space-y-8 overflow-y-auto">
            <fieldset className="border-0 p-0">
              <legend className="mb-4 text-[17px] font-medium">
                Skin Concern
              </legend>
  
              <div className="space-y-4">
                {skinConcerns.map((concern) => {
                  const id = `skin-concern-${concern
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`;
  
                  return (
                    <FilterCheckbox
                      key={concern}
                      id={id}
                      name="skinConcern"
                      value={concern}
                      label={concern}
                    />
                  );
                })}
              </div>
            </fieldset>
  
            <fieldset className="border-0 p-0">
              <legend className="mb-4 text-[17px] font-medium">Skin Type</legend>
  
              <div className="space-y-4">
                {skinTypes.map((type) => {
                  const id = `skin-type-${type
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`;
  
                  return (
                    <FilterCheckbox
                      key={type}
                      id={id}
                      name="skinType"
                      value={type}
                      label={type}
                    />
                  );
                })}
              </div>
            </fieldset>
          </div>
  
          <footer className="flex gap-3 pb-4 pt-6">
            <button
              type="reset"
              className="flex-1 border border-black px-6 py-3 text-sm font-medium text-black"
            >
              Cancel
            </button>
  
            <button
              type="submit"
              className="flex-1 bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Apply
            </button>
          </footer>
        </form>
      </aside>
    );
  };
  
  export default FilterPanel;