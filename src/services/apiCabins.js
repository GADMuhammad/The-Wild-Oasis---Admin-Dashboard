import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could NOT be loaded");
  }

  return cabins;
}

export async function createCabin(newCabin) {
  // console.log(newCabin?.image?.name);
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // 1. create cabin
  const { data: cabins, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imagePath })
    .select();

  if (error) throw new Error("Cabins could NOT be inserted.");

  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  // 3. delete the cabin if there was an error uploading image
  if (storageError)
    deleteCabin(
      newCabin.id,
      "Cabin image could NOT be uploaded and the cabin was not created.",
    );

  return cabins;
}

export async function deleteCabin(
  id,
  errorMessage = "Cabins could NOT be deleted!!",
) {
  const { data: cabins, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(errorMessage);
  }

  return cabins;
}
