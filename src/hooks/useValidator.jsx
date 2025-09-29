export default function useValidator(data, setError) {
  const validationConfig = {
    name: [
      { required: true, message: "Name is required !" },
      { maxLength: 16, message: "Name cannot exceed 16 characters." },
    ],
    phoneNumber: [
      { code: data.codeLength, message: "Number is required !" },
      { example: data.numberLength, message: 'Please enter a valid number !' }
    ],
    password: [
      { required: true, message: "Password is required !" },
      {
        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
        message:
          "Must include upper, lower, and a number.",
      },
      { maxLength: 16, message: "Password cannot exceed 16 characters." },
      { minLength: 8, message: "Password must be at least 8 characters." },
    ],
  };
 
  const newErrors = {};

  Object.entries(data).forEach(([key, value]) => {
    if (!validationConfig[key]) return;

    for (let rule of validationConfig[key]) {
      if (rule.required && !value) {
        newErrors[key] = rule.message;
        break;
      }
      if (rule.minLength && value.length < rule.minLength && value.length > 0) {
        newErrors[key] = rule.message;
        break;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        newErrors[key] = rule.message;
        break;
      }
      if (rule.pattern && !rule.pattern.test(value) && value.length > 0) {
        newErrors[key] = rule.message;
        break;
      }
      if(rule.code && value.length < rule.code + 1){
        newErrors[key] = rule.message;
      }
      if(rule.example && value.length < rule.example + data.codeLength && value.length > data.codeLength){
        newErrors[key] = rule.message;
      }
    }
  });

  setError(newErrors);
  
  return Object.keys(newErrors).length === 0;
}
