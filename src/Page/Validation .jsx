import React, { useState } from "react";
import "./Validation.css";

function Validation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newError = {};

    
    if (!form.name.trim()) {
      newError.name = "Name cannot be empty";
    } else if (form.name.length < 3) {
      newError.name = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z]+$/.test(form.name)) {
      newError.name = "Only letters allowed";
    }

    
    if (!form.email.trim()) {
      newError.email = "Email cannot be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newError.email = "Invalid email format";
    }

    
    if (!form.phone.trim()) {
      newError.phone = "Phone number required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newError.phone = "Phone must be 10 digits";
    }

    
    if (!form.password) {
      newError.password = "Password required";
    } else if (form.password.length < 8) {
      newError.password = "Must be min 8 characters";
    } else if (
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/[0-9]/.test(form.password) ||
      !/[!@#$%^&*]/.test(form.password)
    ) {
      newError.password =
        "Must include uppercase, lowercase, digit & symbol";
    }

    
    if (form.confirmPassword !== form.password) {
      newError.confirmPassword = "Passwords do not match";
    }

   
    if (!form.age) {
      newError.age = "Age required";
    } else if (isNaN(form.age)) {
      newError.age = "Age must be a number";
    } else if (form.age < 5 || form.age > 120) {
      newError.age = "Enter valid age";
    }
  

    
    if (!form.address.trim()) {
      newError.address = "Address cannot be empty";
    } else if (form.address.trim().length < 5) {
      newError.address = "Address too short (min 5 characters)";
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Form Submitted Successfully");
      console.log(form);



      const usersData = {...form , age: Number(form.age)};

      localStorage.setItem("userFormData",JSON.stringify(usersData));
    }



    setForm({
       name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    address: "",


    });

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 to-blue-800 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-xl p-10 rounded-2xl w-full max-w-lg shadow-2xl border border-white/30 animate-fadeIn"
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Registration Form
        </h1>

        {[
          {
            label: "Name",
            name: "name",
            type: "text",
            ph: "Enter your name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            ph: "Enter your email",
          },
          {
            label: "Phone",
            name: "phone",
            type: "text",
            ph: "Enter your phone",
          },
          {
            label: "Password",
            name: "password",
            type: "password",
            ph: "Enter your password",
          },
          {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
            ph: "Confirm password",
          },
          {
            label: "Age",
            name: "age",
            type: "text",
            ph: "Enter your age",
          },
        ].map((field, index) => (
          <div className="mb-6" key={index}>
           
            <label className="block text-white text-sm mb-1">
              {field.label}
            </label>

           
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.ph}
              className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40
              border outline-none transition-all 
              ${
                errors[field.name]
                  ? "border-red-500"
                  : "border-white/30"
              }
              focus:border-yellow-300`}
            />

            
            {errors[field.name] && (
              <p className="text-red-400 text-sm mt-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

       
        <div className="mb-6">
          <label className="block text-white text-sm mb-1">
            Address
          </label>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            placeholder="Enter your full address"
            className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40
              border outline-none transition-all 
              ${
                errors.address
                  ? "border-red-500"
                  : "border-white/30"
              }
              focus:border-yellow-300`}
          ></textarea>

          {errors.address && (
            <p className="text-red-300 text-sm mt-1 animate-shake">
              {errors.address}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-300 text-black py-3 rounded-xl font-bold
            text-lg shadow-lg hover:bg-yellow-400 transition-all active:scale-95"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Validation;






