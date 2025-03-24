import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare,Mail,Lock,Eye,EyeOff ,Loader2} from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const {login,isLoginIn} = useAuthStore()
  const [showPassword,setShowPassword] = useState()
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const handleSubmit = async(e)=>{
    e.preventDefault()
    login(formData)
  }

  return (
    <div className="min-h-screen pt-10  grid lg:grid-cols-2 ">
      {/* left side  */}
      <div className=" flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md  ">
          {/* logo  */}
          <div className="text-center mb-8 ">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />'
              </div>
              <h1 className="text-2xl font-bold mt-2">Log in</h1>
              <p className="text-base-content/60">
                Get started with your  account
              </p>
            </div>
          </div>
          {/* form  */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="">
                <span className="font-medium text-sm">Email</span>
              </label>

              {/* Main div that will get a bright white border when clicked */}
              <div
                className="px-2 py-1 rounded border border-white/20 focus-within:border-white transition-all duration-300">
                <div className="flex gap-2 items-center">
                  <Mail />
                  <input
                    className="w-full p-2 outline-none bg-transparent text-white"
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter Email"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="">
                <span className="font-medium text-sm">Password</span>
              </label>

              {/* Main div that will get a bright white border when clicked */}
              <div
                className="px-2 py-1 rounded border border-white/20 focus-within:border-white transition-all duration-300">
                <div className="flex gap-2 items-center">
                  <Lock />
                  <input
                    className="w-full p-2 outline-none bg-transparent text-white"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="**********"
                  />
                  <button
                    type="button"
                    className=" inset-y-0 right-0 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className=" size-5 text-base-content/40" />
                    ) : (<EyeOff className=" size-5 text-base-content/40 " />)}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary font-bold" disabled={isLoginIn}>
              {isLoginIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : "Log in"}
            </button>
          </form>
          <div className="mt-2 text-sm text-center">
            <p className="text-base-content/60">Want to Create Account?{" "}
              <Link to={'/signup'} className="link link-primary">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side  */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends,share momemts, and stay in touch with yuor loved ones"
      />
    </div>
  )
}

export default LoginPage


