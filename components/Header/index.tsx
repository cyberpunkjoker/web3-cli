import { FC } from "react";
import LoginButton from "./loginBotton";

const Header: FC = () => {
  return (
    <header className="flex right">
      <LoginButton></LoginButton>


    </header>
  )
}

export default Header;