

export default function Input({
  startIcon,
  endIcon,
  placeholder,
  tail = "",
  value,
  tailInput = "",
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  type,
  crossHandler,
  crossRef,
  inputMode,
}) {
  return (
    <div 
      className={`relative flex h-[45px] w-[95%] items-center gap-2 rounded-[4px] border border-[#EDEDED] bg-[#EDEDED] px-2 ${tail}`}
    >
      {startIcon === "user" && <i className="fa-solid fa-user"></i>}
      {startIcon === "lock" && <i className="fa-solid fa-lock"></i>}
      {startIcon === "eye" && <i className="fa-solid fa-eye-slash"></i>}
      {startIcon === "email" && <i className="fa-solid fa-envelope"></i>}
      {startIcon === "mobile" && <i className="fa-solid fa-phone"></i>}

      <span
  className={`inline-block transform transition-all duration-200 ease-in-out ${
    startIcon === "glass"
      ? "translate-x-0 opacity-100"
      : "-translate-x-2 opacity-0 pointer-events-none w-0"
  }`}
>
  <i className="fa-solid fa-magnifying-glass" />
</span>

      <input
        className={`w-full h-full bg-transparent focus:outline-none ${tailInput}`}
        {...(value !== undefined ? {value} : {})}
        {...(onChange ? { onChange } : {})}
        {...(onFocus ? { onFocus } : {})}
        {...(inputMode ? { inputMode } : {})}
        {...(onBlur ? { onBlur } : {})}
        {...(onKeyDown ? { onKeyDown } : {})}
        type={type || 'text'}
        placeholder={placeholder}
      />

      {endIcon === "user" && <i className="fa-solid fa-user"></i>}
      {endIcon === "lock" && <i className="fa-solid fa-lock"></i>}
      {endIcon === "eye" && <div className="flex items-center w-[20px] h-full "><i className="fa-solid fa-eye-slash"></i></div>}
      {endIcon === "email" && <i className="fa-solid fa-envelope"></i>}
      {endIcon === "mobile" && <i className="fa-solid fa-phone"></i>}
      {endIcon === "filter" && <i className="fa-solid fa-sliders"></i>}
      {endIcon === "cross" && <div  className="h-full px-1 w-[30px] justify-center cursor-pointer flex items-center" tabIndex={0}  ref={crossRef} onClick={crossHandler}><i className="fa-solid fa-xmark"></i></div>}
      

    </div>
  );
}