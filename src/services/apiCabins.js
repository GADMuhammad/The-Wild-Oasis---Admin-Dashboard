import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could NOT be loaded");
  }

  return cabins;
}

export async function createOrEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  const rowData = { ...newCabin, image: imagePath };
  let query = supabase.from("cabins");

  // A) FOR CREATING CABIN (IN CASE THERE'S NO ID)
  if (!id) query = query.insert([rowData]); // insert is mutable

  // A) FOR EDITING CABIN (IN CASE THERE'S AN ID)
  if (id) query = query.update(rowData).eq("id", id);

  const { data: cabins, error } = await query.select();
  if (error) throw new Error("Cabins could NOT be inserted.");

  // 2. Upload image
  // if (hasImagePath) return cabins;

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  // 3. delete the cabin if there was an error uploading image
  if (storageError) {
    deleteCabin(
      newCabin.id,
      "Cabin image could NOT be uploaded and the cabin was not created.",
    );
  }

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
