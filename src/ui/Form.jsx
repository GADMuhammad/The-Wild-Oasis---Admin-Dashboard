const types = {
  regular: "rounded-md border border-grey-100 bg-grey-0 px-[4rem] py-[2.4rem]",
  modal: "w-[80rem]",
};

export default function Form({ type = "regular", className = "", ...props }) {
  return (
    <form
      className={`overflow-hidden text-[1.4rem] ${types[type]} ${className}`}
      {...props}
    />
  );
}
