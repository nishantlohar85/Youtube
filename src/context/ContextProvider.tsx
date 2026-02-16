import { useState, type JSX } from "react"
import { Context } from "./Context";

type ContextProviderProps = {
    children: JSX.Element;
}

function ContextProvider({ children }: ContextProviderProps) {

    const [sidebar, setSidebar] = useState(true);
    const [category, setCategory] = useState(0);
    const [search, setSearch] = useState("");
    const [searchClick, setSearchClick] = useState(false);

    const contextValue = {
        sidebar,
        setSidebar,
        category,
        setCategory,
        search,
        setSearch,
        searchClick,
        setSearchClick
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider