import { useFormContext } from "react-hook-form";
import formDetails from "./cabinFormDetailsArray";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import AirConditioningCheckBox from "../../ui/airConditioningCheckBox";

export default function CabinFormDetails({ isToEditSession }) {
  const { register, getValues, formState } = useFormContext();
  const { errors } = formState;

  return formDetails.map(function ({ label, textarea, ...info }) {
    const InputComponent =
        info.type === "checkbox"
          ? AirConditioningCheckBox
          : textarea
            ? Textarea
            : Input,
      errorMessage = errors?.[info.id]?.message;

    function validate(value) {
      if (info.id === "discount") {
        return (
          +value < +getValues().regularPrice ||
          "Discount should be less than regular price."
        );
      }
      return true;
    }

    function required() {
      if (info.type === "checkbox") return undefined;
      if (info.id === "image" && isToEditSession) return false;
      return `${label} field is required.`;
    }

    return (
      <div
        className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-grey-100 px-0 py-[1.2rem] first:pt-0 last:border-b-0 last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-[1.2rem]"
        key={info.id}
      >
        <label className="font-medium" htmlFor={info.id}>
          {label}
        </label>
        <InputComponent
          {...info}
          {...register(info.id, {
            min: info.min ? { value: info.min } : undefined,
            max: info.max ? { value: info.max } : undefined,
            valueAsNumber: info.type === "number",
            required: required(),
            validate, // discount validate to be less than the regular price
          })}
        />
        {errorMessage && (
          <span className="text-[1.4rem] text-red-700">{errorMessage}</span>
        )}
      </div>
    );
  });
}
