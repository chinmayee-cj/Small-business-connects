/*import React from "react";
import { demouser } from "../Assets/index";

const Navbar = ({ pagename }) => {
  // const [userInfo, setUserInfo] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/users").then((response) => {
  //     setUserInfo(response.data.data);
  //     console.log(userInfo);
  //   });
  // }, []);

  return (
    <nav className="bg-gradient-to-b from-yellow-50 via-lime-100 to-emerald-100 shadow-md flex items-center justify-between h-20 px-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-500">{pagename}</h1>
      </div>
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-4">
          <img src={demouser} alt="avatar" className="rounded-full h-8 w-8" />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium">John Doe</span>
          <span>Super Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;*/

import React from "react";
import { demouser } from "../Assets/index";

const Navbar = ({ pagename }) => {
  return (
    // ✅ Ensures all corners are rounded — try `rounded-xl` or `rounded-2xl`
    <nav className="rounded-xl bg-gradient-to-b from-yellow-50 via-lime-100 to-emerald-100 shadow-md flex items-center justify-between h-20 px-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-500">{pagename}</h1>
      </div>
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-4">
          <img src={demouser} alt="avatar" className="rounded-full h-8 w-8" />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

