import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/auth";
import useAuthStore from "@/zustand/authStore";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const { user,setUser,setIsAuthenticated } = useAuthStore();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate=useNavigate()
  async function handleSubmit() {
    const userData = {
      email,
      password,
    };
    
    //console.log(user);
    const result = await login(userData);
    //console.log(result)
    setIsAuthenticated(true)
    setUser(result);
    console.log("State: ",user)
    if(!user.profileSetup)
      navigate("/create-profile")
    else
      navigate("/dashboard")
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }
        }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
}
