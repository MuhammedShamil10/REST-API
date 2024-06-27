import { NavLink, Outlet } from "react-router-dom";
import { useGetUserPost } from "../api/users/useGetUsersPost";

export const SideNavBar = () => {
  const { data: userPostResponse, isLoading } = useGetUserPost();

  return (
    <>
      <ul className="flex flex-col gap-3 bg-[#AFC9E4] m-0  p-2">
        <li className="block">
          <a href="#news">
          
              <NavLink
                to={`/home/${userPostResponse?.[0].id}`}
                style={({ isActive }) =>
                  isActive ? { color: "white" } : { color: "black" }
                }
              >
                Home
              </NavLink>

          </a>
        </li>
        <hr />
        <li className="block">
          <a href="12">
            <NavLink
              to="/admin/1"
              style={({ isActive }) =>
                isActive ? { color: "white" } : { color: "black" }
              }
            >
              Admin
            </NavLink>
          </a>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
