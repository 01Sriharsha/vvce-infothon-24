import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const NavBar = () => {
  return (
    <div className="w-full flex justify-end p-2 bg-slate-400">
      <Avatar>
        <AvatarImage src="https://www.mobygames.com/static/img/icon-user.png" className="w-12 mr-6"/>
        <AvatarFallback>IMG</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavBar;
