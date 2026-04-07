import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import formDetails from "./CabinFormDetails";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm({ setShowForm }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isPending: isCreatingCabin, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: function () {
      toast.success("New cabin successfully added.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      setShowForm(false);
    },
    onError: (error) => toast.error(error.message),
  });

  function onError(errors) {
    toast.error(Object.values(errors)[0].message);
  }

  return (
    <Form onSubmit={handleSubmit(mutate, onError)}>
      {formDetails.map(function ({ label, textarea, ...info }) {
        const InputComponent = textarea ? Textarea : Input;
        const errorMessage = errors?.[info.id]?.message;

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
          return `${label} field is required.`;
        }

        return (
          <FormRow key={info.id}>
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
          </FormRow>
        );
      })}

      <FormRow>
        <label className="font-medium" htmlFor="image">
          Cabin photo
        </label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          type="reset"
          variation="secondary"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </Button>
        <Button disabled={isCreatingCabin}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
