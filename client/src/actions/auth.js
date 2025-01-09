import { toast } from "react-toastify"
import { api } from "@/utils/constants.js";
// const fetchUser = async (user)=>{
//     try {
//         const res= await api.get('/users/verify')
//         console.log("fetchedUser: ",res.data.data.user)
//         return res.data.data.user
//     } catch (error) {
//         console.log(error)
//         toast.error("Something went wrong...\nTry again.")
//     }
// }
const login = async (user) => {
    try {
        const res = await api.post(`/users/login`, {
            email: user.email,
            password: user.password,
        });

        if (res.status === 400) {
            toast(`Invalid credentials`);
            return;
        }

        toast(`Welcome ${res.data.data.user.name.firstName}`);
        //console.log("Login: ", res.data.data.user);
        return res.data.data.user;
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong...\nTry again.")
    }
}

const register = async (user) => {
    try {
        api.post(`/users/register`, {
            fName:user.fName,
            lName:user.lName,
            email: user.email,
            password: user.password
        }).then((res) => {
            if (res.status == 400) {
                toast(`Invalid credentials`)
            }
            toast(`Registered Successfully!!`)
            console.log(res.data.data)
            return res.data.data
        }).catch((res) => {
            toast.error(res.response.data)
        })
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong...\nTry again.")
    }
}

export { login,register }