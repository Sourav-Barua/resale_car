import React, { useContext } from "react";
import toast from "react-hot-toast";
import { BsFillCheckCircleFill } from "react-icons/bs";
import useSellerRoute from "../../Hookes/useSellerRoute/useSellerRoute";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CategoryCard = ({ product, setModalProduct }) => {
  const { user } = useContext(AuthContext);
  const [isSeller] = useSellerRoute(user?.email);
  console.log(product);
  const {
    location,
    mobileNumber,
    originalPrice,
    resalePrice,
    postTime,
    productDescription,
    productImage,
    productName,
    yearOfPurchase,
    _id,
  } = product;

  const handleReportedItem = (product) => {
    product.productId = product._id;
    fetch("http://localhost:5000/report", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Successfully reported!");
        }
      })
      .catch((er) => console.log(er));
  };
  return (
    <div className="bg-slate-100">
      {product.paid || (
        <div className="card lg:card-side  shadow-xl  my-5 border-[10px] border-accent">
          <figure className="lg:w-1/3 w-full lg:pl-5">
            <img
              className="w-full h-80 border-2  rounded-md"
              src={productImage}
              alt="Album"
            />
          </figure>
          <div className="card-body lg:w-2/3 w-full">
            <div className="flex items-center">
              <h2 className="card-title text-2xl text-secondary">
                {productName}
              </h2>
              {product.verified && (
                <BsFillCheckCircleFill className="text-primary ml-2"></BsFillCheckCircleFill>
              )}
              <p className="text-right">{postTime}</p>
            </div>
            <p>{productDescription}</p>
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  <tbody className="text-xl font-semibold">
                    <tr className="border-2 bg-slate-100">
                      <td className="text-primary">Orginal Price :</td>
                      <td>${originalPrice}</td>
                    </tr>
                    <tr className="border-2 bg-slate-100">
                      <td className="text-primary">Resale Price :</td>
                      <td>${resalePrice}</td>
                    </tr>
                    <tr className="border-2 bg-slate-100">
                      <td className="text-primary">Location :</td>
                      <td>{location.toUpperCase()}</td>
                    </tr>
                    <tr className="border-2 bg-slate-100">
                      <td className="text-primary">Mobile Number :</td>
                      <td>++{mobileNumber}</td>
                    </tr>
                    <tr className="border-2 bg-slate-100 ">
                      <td className="text-primary">Year of purchase :</td>
                      <td>{yearOfPurchase}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-actions justify-between items-baseline">
              {isSeller || (
                <label
                  onClick={() => handleReportedItem(product)}
                  className="text-primary btn btn-outline btn-xs"
                >
                  Report
                </label>
              )}
              <label
                disabled={isSeller}
                onClick={() => setModalProduct(product)}
                htmlFor="bookinModal"
                className="btn btn-primary"
              >
                Book now
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
