import { createContext } from "react";

type ContextProps = {
    sidebar: boolean,
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    category: number,
    setCategory: React.Dispatch<React.SetStateAction<number>>,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    searchClick: boolean,
    setSearchClick: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ContextProps>({
    sidebar: true,
    setSidebar: () => {},
    category: 0,
    setCategory: () => {},
    search: "",
    setSearch: () => {},
    searchClick: false,
    setSearchClick: () => {}
});