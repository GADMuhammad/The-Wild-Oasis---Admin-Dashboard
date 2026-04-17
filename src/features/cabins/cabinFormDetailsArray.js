const formDetails = [
  {
    label: "Cabin name",
    id: "name",
    type: "text",
    defaultValue: "00",
    autoComplete: "name",
  },
  {
    label: "Regular price",
    id: "regularPrice",
    type: "number",
    min: 1,
    placeholder: "how much to rent the cabin?",
  },
  {
    min: 0,
    id: "discount",
    type: "number",
    defaultValue: 0,
    label: "Discount",
  },
  {
    label: "Cabin area",
    id: "area",
    type: "number",
    min: 50,
    placeholder: "cabin area in square meter",
  },
  {
    label: "Number of rooms",
    id: "numberOfRooms",
    type: "number",
    min: 1,
    max: 9,
    placeholder: "the number of the rooms in the cabin",
  },
  {
    label: "Maximum capacity",
    id: "maxCapacity",
    type: "number",
    min: 1,
    max: 10,
    placeholder: "the maximum capacity of the cabin",
  },
  { label: "Air Conditioning", id: "airConditioning", type: "checkbox" },
  {
    textarea: true,
    label: "Description for website",
    id: "description",
    type: "text",
    defaultValue: "Cabin",
  },
  {
    label: "Cabin photo",
    type: "file",
    id: "image",
    accept: "image/*",
    className:
      "text-[1.4rem] rounded-sm file:font-inherit file:font-medium file:px-[1.2rem] file:py-[0.8rem] file:mr-[1.2rem] file:rounded-sm file:border-none file:text-brand-50 file:bg-brand-600 file:cursor-pointer file:transition-colors file:duration-200 hover:file:bg-brand-700",
  },
];

export default formDetails;
