import useUser from "./useUser";

export default function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <div className="flex items-center gap-[1.2rem] text-[1.4rem] font-medium text-grey-600">
      <img
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        className="block aspect-square w-[3.6rem] rounded-full object-cover object-center outline-2 outline-grey-100"
      />
      <span>{fullName}</span>
    </div>
  );
}
