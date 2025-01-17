import { createContext } from "react"
import { UserInterface } from "../interfaces/user-interface";

type UserContextType = {
    user: UserInterface | null,
    setUser: (user: UserInterface | null) => void
}

const UserContext = createContext<UserContextType>({
    user: null, setUser: () => null
});

export default UserContext;