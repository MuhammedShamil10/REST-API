import { ReactNode, createContext, useState } from "react";

export interface PageContextType {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PageContext = createContext<PageContextType | undefined>(
  undefined
);
interface PaginationUserListProps {
  children: ReactNode;
}
export const PaginationUserList = ({ children }: PaginationUserListProps) => {
  const [page, setPage] = useState(1);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
