import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could NOT be loaded");
  }

  return cabins;
}

export const cabins = [
  {
    imageURL:
      "https://hysdpqistsxwskcopfwh.supabase.co/storage/v1/object/sign/cabins-images/cabin-001.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNzI4NzI1Mi03YTlkLTRjNjgtYmVmYy01OTdlYzViY2NkZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwMS5qcGciLCJpYXQiOjE3NzUzMzc4NDYsImV4cCI6MTgwNjg3Mzg0Nn0.WXEfe1ZfZnnOs_Mo72luMMMUpSuqXORejLGJjciHRcc",
  },
  {
    imageURL:
      "https://hysdpqistsxwskcopfwh.supabase.co/storage/v1/object/sign/cabins-images/cabin-002.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNzI4NzI1Mi03YTlkLTRjNjgtYmVmYy01OTdlYzViY2NkZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwMi5qcGciLCJpYXQiOjE3NzUzMzc5MDUsImV4cCI6MTgwNjg3MzkwNX0.TUy9FMoNyW6f9a2owkDXVwWlGth1LEYfabWupRbOR7Q",
  },
  {
    imageURL:
      "https://hysdpqistsxwskcopfwh.supabase.co/storage/v1/object/sign/cabins-images/cabin-003.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNzI4NzI1Mi03YTlkLTRjNjgtYmVmYy01OTdlYzViY2NkZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwMy5qcGciLCJpYXQiOjE3NzUzMzc5MTMsImV4cCI6MTgwNjg3MzkxM30.uNaIzH_M7EfSx3n0_nYHJle5OZchvf78QyRdfUWN49s",
  },
  {
    imageURL:
      "https://hysdpqistsxwskcopfwh.supabase.co/storage/v1/object/sign/cabins-images/cabin-004.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNzI4NzI1Mi03YTlkLTRjNjgtYmVmYy01OTdlYzViY2NkZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwNC5qcGciLCJpYXQiOjE3NzUzMzc5MjAsImV4cCI6MTgwNjg3MzkyMH0.BRH9J14bF-abcbVgwfcZarxuwVfDCS87aTwxBYzbrK0",
  },
  {
    imageURL:
      "https://hysdpqistsxwskcopfwh.supabase.co/storage/v1/object/sign/cabins-images/cabin-005.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNzI4NzI1Mi03YTlkLTRjNjgtYmVmYy01OTdlYzViY2NkZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwNS5qcGciLCJpYXQiOjE3NzUzMzc5MjcsImV4cCI6MTgwNjg3MzkyN30.XU_C47NOOgByDb_3xv0aFCfSSuSXbhUywS1u12aixko",
  },
  {
    imageURL:
      "https://hysdpqistsxwskcopfwh.supabase.co/storage/v1/object/sign/cabins-images/cabin-006.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNzI4NzI1Mi03YTlkLTRjNjgtYmVmYy01OTdlYzViY2NkZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwNi5qcGciLCJpYXQiOjE3NzUzMzc5MzQsImV4cCI6MTgwNjg3MzkzNH0.gHguQolfxNEObFMfy3GjADsS2sQZ_M8gPKPbf_6xCj4",
  },
  {
    imageURL:
      "https://hysdpqistsxwskcopfwh.supabase.co/storage/v1/object/sign/cabins-images/cabin-007.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNzI4NzI1Mi03YTlkLTRjNjgtYmVmYy01OTdlYzViY2NkZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwNy5qcGciLCJpYXQiOjE3NzUzMzc5NDQsImV4cCI6MTgwNjg3Mzk0NH0.Wv-AbJgcdXb_nqWiy-v9G939OiTJtEFOkITXc2VF8jI",
  },
  {
    imageURL:
      "https://hysdpqistsxwskcopfwh.supabase.co/storage/v1/object/sign/cabins-images/cabin-008.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xNzI4NzI1Mi03YTlkLTRjNjgtYmVmYy01OTdlYzViY2NkZDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwOC5qcGciLCJpYXQiOjE3NzUzMzc5NTAsImV4cCI6MTgwNjg3Mzk1MH0.5irinuJR0G5_wHx7YpJ5tmHShdGRUuPA0GSMF11bH9s",
  },
];
