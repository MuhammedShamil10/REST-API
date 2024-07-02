import { Outlet, Link, useParams, useOutletContext } from "react-router-dom";
import { useGetUserDetails } from "../api/users/useGetUserList";
import { useCreateUser } from "../api/users/useCreateUser";
import { useContext, useEffect, useState } from "react";
import { UserInput } from "../components/inputforEditUser";
import { PageContext, PageContextType } from "../components/paginationUserList";

export const SideNav = () => {
  //@ts-ignore
  const { page, setPage }: PageContextType | undefined =
    useContext(PageContext);

  const { data: userListResponse } = useGetUserDetails(page);
  const { mutateAsync: createUser } = useCreateUser();
  const [editUserList, setEditUserList] = useState({
    name: "",
    email: "",
    status: "",
    gender: "",
  });
  const [searchName, setSearchName] = useState<string>("");
  const handleCreateUser = () => {
    createUser({
      email: editUserList.email,
      name: editUserList.name,
      status: editUserList.status,
      gender: editUserList.gender,
    });
  };

  const filteredUserName = userListResponse?.filter((option) =>
    option.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      <div id="sidebar">
        <h1>User List</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search user name"
              type="search"
              name="q"
              value={searchName}
              onChange={(e) => setSearchName?.(e.target.value)}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <div className="h-10">
            <UserInput
              label="Create User"
              buttonLabel="New"
              editUserList={editUserList}
              setEditUserList={setEditUserList}
              onSubmit={handleCreateUser}
            />
          </div>
        </div>
        <nav>
          <ul className="flex flex-col">
            {filteredUserName?.map((option) => (
              <li key={option.id}>
                <Link to={`user/${option.id}`}>{option.name}</Link>
              </li>
            ))}
            <li>
              <Link to={`/admin/1/users/all`}>All</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="overflow-auto" id="detail">
        <Outlet />
      </div>
    </>
  );
};
