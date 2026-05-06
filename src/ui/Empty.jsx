function Empty({ resource = "data" }) {
  return <p className="text-center">No {resource} could be found.</p>;
}

export default Empty;
