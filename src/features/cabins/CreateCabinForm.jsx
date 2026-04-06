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
const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ setShowForm }) {
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();
  const { isPending: isCreatingCabin, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: function () {
      toast.success("New cabin successfully added.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      setShowForm(false);
    },
    onError: (error) => toast.error(error.message),
  });

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(mutate, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          defaultValue="00"
          {...register("name", { required: "Name field is required" })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice")}
          placeholder="how much to rent the cabin?"
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          min={0}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="area">Cabin area</Label>
        <Input
          type="number"
          id="area"
          min={50}
          {...register("area")}
          placeholder="cabin area in square meter"
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="numberOfRooms">Number of rooms</Label>
        <Input
          min={1}
          max={9}
          type="number"
          id="numberOfRooms"
          {...register("numberOfRooms")}
          placeholder="the number of the rooms in the cabin"
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          max={10}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity")}
          placeholder="the maximum capacity of the cabin"
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="airConditioning">Air Conditioning</Label>
        <Input
          type="checkbox"
          id="airConditioning"
          {...register("airConditioning")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="text"
          id="description"
          defaultValue="Cabin"
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => setShowForm(false)}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isCreatingCabin}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
