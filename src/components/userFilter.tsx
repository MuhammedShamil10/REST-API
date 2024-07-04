import { useState } from "react";
import { Checkbox, Dropdown, Label } from "flowbite-react";
import { userGender } from "../common/userGender";
import { UserList } from "../api/type";

type UserFilterProp = {
  selectedValue: UserList | undefined;
  setFilteredGender: React.Dispatch<React.SetStateAction<UserList | undefined>>;
  userListResponse: UserList | undefined;
};

export const UserFilter = ({
  selectedValue,
  userListResponse,
  setFilteredGender,
}: UserFilterProp) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleFilterChange = (value: string) => {
    if (selectedGender === value) {
      setSelectedGender(null);
      setFilteredGender(userListResponse);
    } else {
      setSelectedGender(value);
      let filteredGender = selectedValue?.filter(
        (item) => item.gender === value
      );
      setFilteredGender(filteredGender as any);
    }
  };

  const onClearFilterClick = () => {
    setSelectedGender(null);
    setFilteredGender(userListResponse);
  };

  return (
    <Dropdown inline label="Filter" dismissOnClick={false}>
      {userGender.map((gender) => (
        <div key={gender} className="flex flex-row items-center p-2 bg-white">
          <Checkbox
            onChange={() => handleFilterChange(gender)}
            id={gender}
            checked={selectedGender === gender}
            style={{ color: "black", boxShadow: "none" }}
          />
          <Label className="pl-1" htmlFor={gender}>
            {gender}
          </Label>
        </div>
      ))}
      <div className="border-t text-center font-normal">
        <div
          onClick={onClearFilterClick}
          className="text-black text-xs font-medium underline pt-1 cursor-pointer"
        >
          Clear all
        </div>
      </div>
    </Dropdown>
  );
};
