import { useState } from "react";

type Variant = {
  varient_name: string;
  varient_options: string[];
  varient_price: number[];
};

type Product = {
  product_varients: Variant[];
};

type VariantSelectorProps = {
  product: Product;
};

const VariantSelector: React.FC<VariantSelectorProps> = ({ product }) => {
  const [size, setSize] = useState("");
  const [sizePrice, setSizePrice] = useState(0);

  const handlesizevarient = (cprice: number, csize: string) => {
    console.log(cprice);
    console.log(csize);
    setSize(csize);
    setSizePrice(cprice);
    console.log(size);
    console.log(sizePrice);
  };

  return (
    <>
      {product.product_varients.map((data) => (
        <div key={data.varient_name}>
          <label className={"text-md uppercase font-semibold"}>
            {data.varient_name}
          </label>
          <div className={"flex flex-row justify-start items-center gap-x-10 mt-4"}>
            {data.varient_options.map((option, index) => (
              <button
                key={index}
                onClick={() => handlesizevarient(data.varient_price[index], option)}
                className={`text-lg bg-gray-300 h-10 w-10 font-semibold text-gray-400 border-2 rounded-full ${
                  size === option ? "border-black bg-white" : "border-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default VariantSelector;