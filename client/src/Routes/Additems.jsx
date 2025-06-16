import React, { useState } from "react";
import axios from "axios";
import { useContextValues } from "../Helpers/Contextprovider";
import { useNavigate } from "react-router";
const Additems = () => {
    const navigate = useNavigate()
    const {host,user} = useContextValues()
  const [form, setForm] = useState({
    Name: "",
    Category: "",
    Price: "",
    Description: "",
    Itemtype: "pizza",
    Image:"",
    Seller:user.Email,
    Organisation:user.Organisation
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
 const formData = new FormData();
    formData.append('Image', form.Image);
    formData.append('Category', form.Category);
    formData.append('Name', form.Name);
    formData.append('Price', form.Price);
    formData.append('Seller', form.Seller); // maybe from context or props
    formData.append('Organisation', form.Organisation);
    formData.append('Description', form.Description);
    formData.append('ItemType', form.Itemtype);
        const response= await axios.post(`${host}/host/additem`,formData,{
            headers:{
                "Content-Type":'multipart/form-data'
            }
        });
      if(response.status==200){
        navigate('/Items')
      }
       
    }catch(err){
        console.log(err)
    }
    


    console.log(form);
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-pink-50 to-red-100" enctype="multipart/form-data">
        <form
            onSubmit={handleSubmit}
            className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-lg flex flex-col gap-6 border-4 border-yellow-200"
        >
            <h2 className="text-3xl font-extrabold text-yellow-700 mb-4 text-center">
                Add New Item
            </h2>
            <div className="flex flex-col relative">
                <label
                    htmlFor="file"
                    className="font-semibold text-pink-700 w-50 h-50 border-2 border-dashed hover:border-pink-700 border-pink-100 grid place-items-center m-auto rounded-lg transition-all cursor-copy"
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files[0];
                        if (file) {
                            if (!file.type.startsWith("image/")) {
                                alert("Please select a valid image file.");
                                return;
                            }
                           setForm((prev)=>({...prev,Image:file}))
                        }
                    }}
                >
                 Click or Drop Item Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                            if (!file.type.startsWith("image/")) {
                                alert("Please select a valid image file.");
                                return;
                            }
                             setForm((prev)=>({...prev,Image:file}))
                           
                        }
                    }}
                    name="Image"
                    id="file"
                    className="hidden"
                    required
                />
                {form.Image && (
                    <img
                        src={URL.createObjectURL(form.Image)}
                        className="w-50 h-50 m-auto object-cover backdrop-blur-3xl  absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none rounded-lg"
                        alt="Preview"
                    />
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-pink-700">Category</label>
                <input
                    type="text"
                    name="Category"
                    value={form.Category}
                    onChange={handleChange}
                    className="p-3 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-yellow-400"
                    placeholder="e.g. Veg, Non-Veg, Soft Drink,or Category of item"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-pink-700">Name</label>
                <input
                    type="text"
                    name="Name"
                    value={form.Name}
                    onChange={handleChange}
                    className="p-3 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-yellow-400"
                    placeholder="Item Name"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-pink-700">Price (₹)</label>
                <input
                    type="number"
                    name="Price"
                    value={form.Price}
                    onChange={handleChange}
                    className="p-3 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-yellow-400"
                    placeholder="Price"
                    min="1"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-pink-700">Description</label>
                <textarea
                    name="Description"
                    value={form.Description}
                    onChange={handleChange}
                    className="p-3 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-yellow-400"
                    placeholder="Short Description"
                    rows={3}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-pink-700">Item Type</label>
                <select
                    name="Itemtype"
                    value={form.Itemtype}
                    onChange={handleChange}
                    className="p-3 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-yellow-400"
                    required
                >
                    <option value="pizza">Pizza</option>
                    <option value="drinks">Drinks</option>
                </select>
            </div>
            <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-xl font-bold py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
            >
                Add Item
            </button>
        </form>
    </div>
);
};

export default Additems;
