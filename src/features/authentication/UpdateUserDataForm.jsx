import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName),
    [avatar, setAvatar] = useState(null),
    { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(event) {
    event.preventDefault();
    fullName &&
      updateUser(
        { fullName, avatar },
        {
          onSuccess: function () {
            setAvatar(null);
            event.target.reset();
          },
        },
      );
  }

  function handelCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit} variants={containerVariants}>
      <FormRow label="Email address">
        <Input disabled={isUpdating} value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          disabled={isUpdating}
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          id="fullName"
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={({ target }) => setAvatar(target.files[0])}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isUpdating}
          onClick={handelCancel}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
