import { useEffect, useState } from "react";

export default function PhoneInput({ userData, setUserData, setError }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter Phone Number");
  const [showCountries, setShowCountries] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedCountry) {
      const newDial = selectedCountry.calling_code;
      setUserData((p) => ({
        ...p,
        phoneNumber: newDial,
        numberLength: selectedCountry.example.replace(/\s/g, "").length,
        codeLength: newDial.length
      }));
      setPlaceholder(selectedCountry.example);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const [countriesRes, ipRes] = await Promise.all([
          fetch(
            "https://raw.githubusercontent.com/Usmantahir0707/CountriesPhone/refs/heads/main/countriesNumbers.json",
          ),
          fetch("https://ipwho.is/"),
        ]);
        const [countriesData, ipData] = await Promise.all([
          countriesRes.json(),
          ipRes.json(),
        ]);
        setCountries(countriesData);

        const code = "+" + ipData.calling_code;
        const matched = countriesData.find((c) => c.calling_code === code);

        matched && setSelectedCountry(matched);

        setLoading(false);
     
      } catch (err) {
        console.error("Country detect failed:", err);
      }
    };
    getCountries();
  }, []);

  const dialCode = selectedCountry && selectedCountry.calling_code;

  const trimmedValue =
    userData.phoneNumber &&
    dialCode &&
    userData.phoneNumber.startsWith(dialCode)
      ? userData.phoneNumber.slice(dialCode.length)
      : userData.phoneNumber;

  const formattedValue =
    selectedCountry?.example && trimmedValue
      ? (() => {
          const digits = trimmedValue.replace(/\D/g, "");
          let formatted = "";
          let digitIndex = 0;
          for (
            let i = 0;
            i < (selectedCountry.example?.length || 0) &&
            digitIndex < digits.length;
            i++
          ) {
            if (selectedCountry.example[i] === " ") {
              formatted += " ";
            } else {
              formatted += digits[digitIndex];
              digitIndex++;
            }
          }
          return formatted;
        })()
      : trimmedValue;

  const handleChange = (e) => {
    if (!dialCode) return;
    const digits = e.target.value.replace(/\D/g, "");
    const newVal = dialCode + digits;
    setUserData((p) => ({ ...p, phoneNumber: newVal }));
    setError((p) => {
      const { phoneNumber, ...rest } = p;
      return rest;
    });
  };

  return (
    <div
      role="container"
      className="flex h-[50px] max-w-[270px] items-center gap-2 bg-[#EDEDED] p-2 text-[14px]"
    >
      <div
        onClick={() => {
          setShowCountries((p) => !p)
          setSearch('')
        }}
        className="relative flex h-full cursor-pointer items-center"
      >
        <span className="text-[8px] text-gray-600">▼</span>
        <ul className="ml-1 min-w-[20px]">
          <li>
            {loading ? (
              <div className="h-[15px] w-[15px] loading rounded-[50%] border-t-2"></div>
            ) : (
              <img
                className="h-4 w-6 rounded-sm object-cover"
                src={selectedCountry?.flag || ""}
                alt="flag"
              />
            )}
          </li>
        </ul>
        {showCountries && (
          <div className="hide-scrollbar absolute bottom-[-268px] left-[-9px] z-10 flex h-[260px] w-[258px] flex-col gap-1 overflow-y-auto rounded-md bg-[#EDEDED] p-4 pt-12 text-left">
            <div className="fixed h-[41px] w-[220px] translate-y-[-48px] rounded-md bg-white px-2 py-2 shadow-2xl">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-full p-1 py-2 focus:ring-0 focus:outline-none"
                onClick={(e) => e.stopPropagation()}
                type="text"
                placeholder="🔎 Search country..."
              />
            </div>
            <ul className="flex flex-col gap-1">
              {countries
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .filter((f) =>
                  f.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((x) => (
                  <li
                    key={x.name}
                    onClick={() => setSelectedCountry(x)}
                    className="w-full border-b border-gray-400 py-2"
                  >
                    <div className="flex h-[20px] w-full justify-between gap-2">
                      <div className="flex gap-2">
                        <img
                          className="w-[30px] object-cover"
                          src={x.flag}
                          alt=""
                        />
                        <h2 className="w-[120px] truncate" title={x.name}>
                          {x.name}
                        </h2>
                      </div>

                      <p>({x.calling_code})</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <span>{dialCode}</span>
      <input
        className="h-[50px] max-w-[250px] flex-1 bg-[#EDEDED] focus:ring-0 focus:outline-none"
        type="tel"
        maxLength={selectedCountry?.example?.length || 20}
        inputMode="numeric"
        placeholder={placeholder}
        value={formattedValue}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
