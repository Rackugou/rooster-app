import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { authenticateUser } from "../../lib/database";
import { useAuth } from "../../contexts/AuthContext";

export const LogIn = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; auth?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string; auth?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is verplicht";
    } else if (!email.includes("@")) {
      newErrors.email = "Voer een geldig e-mailadres in";
    }

    if (!password.trim()) {
      newErrors.password = "Wachtwoord is verplicht";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const user = authenticateUser(email, password);
      
      if (user) {
        login(user);
        navigate('/dashboard');
      } else {
        setErrors({ auth: "Ongeldige inloggegevens" });
      }
    }
  };

  return (
    <main
      className="bg-[#003883] w-screen h-screen fixed inset-0 flex items-center justify-center overflow-hidden"
      data-model-id="374:11750"
    >
      {/* Desktop Background */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1920px] h-[950px]">
        <img
          className="absolute top-[413px] left-[344px] w-[237px] h-[119px]"
          alt="Polygon"
          src="https://c.animaapp.com/mhnug1gsecy1VH/img/polygon-30.svg"
        />

        <img
          className="absolute top-0 left-0 w-[1920px] h-[950px]"
          alt="Frame"
          src="https://c.animaapp.com/mhnug1gsecy1VH/img/frame-1013.svg"
        />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden absolute inset-0 overflow-hidden bg-[#003883] flex items-center justify-start">
        <div className="relative w-[800px] h-[950px] -ml-[100px]">
          <img
            className="absolute top-0 left-0 w-[800px] h-[950px] object-cover object-left"
            alt="Frame"
            src="https://c.animaapp.com/mhnug1gsecy1VH/img/frame-1013.svg"
          />
          <img
            className="absolute top-[413px] left-[344px] w-[237px] h-[119px]"
            alt="Polygon"
            src="https://c.animaapp.com/mhnug1gsecy1VH/img/polygon-30.svg"
          />
        </div>
      </div>

      <Card className="w-[334px] md:w-[483px] max-w-[90%] bg-white shadow-[0px_4px_4px_5px_#00000040] relative z-10">
        <CardContent className="p-0">
          <form onSubmit={handleLogin} className="relative pt-[18px] pb-[25px] px-[18px] md:py-[18px] md:px-[26px]">
            <h1 className="[font-family:'Roboto_Condensed',Helvetica] text-[#003883] text-[32px] md:text-[40px] font-semibold tracking-[0] leading-[normal] text-center mb-[31px]">
              LOG IN
            </h1>

            {errors.auth && (
              <p className="text-[#ee7d11] text-sm [font-family:'Source_Sans_Pro',Helvetica] mb-4 text-center">
                {errors.auth}
              </p>
            )}

            <div className="space-y-[49px] md:space-y-6">
              <div className="space-y-[10px] md:space-y-[2px]">
                <Label
                  htmlFor="email"
                  className="[font-family:'Source_Sans_Pro',Helvetica] font-normal text-[#4d526e] text-xl tracking-[0] leading-[normal]"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Naam@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
                  }}
                  className={`border-0 border-b ${errors.email ? "border-[#ee7d11]" : "border-[#c2c2c5]"} rounded-none px-0 [font-family:'Source_Sans_Pro',Helvetica] font-normal text-[#4d526e] text-[13px] md:text-xl tracking-[0] leading-[normal] h-auto pb-1 md:pb-2 focus-visible:ring-0 focus-visible:ring-offset-0`}
                />
                {errors.email && (
                  <p className="text-[#ee7d11] text-sm [font-family:'Source_Sans_Pro',Helvetica] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-[10px] md:space-y-[2px]">
                <Label
                  htmlFor="password"
                  className="[font-family:'Source_Sans_Pro',Helvetica] font-normal text-[#4d526e] text-xl tracking-[0] leading-[normal]"
                >
                  Wachtwoord
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors({ ...errors, password: undefined });
                      }
                    }}
                    className={`border-0 border-b ${errors.password ? "border-[#ee7d11]" : "border-[#c2c2c5]"} rounded-none px-0 pr-8 [font-family:'Source_Sans_Pro',Helvetica] font-normal text-[#4d526e] text-[13px] md:text-xl tracking-[0] leading-[normal] h-auto pb-1 md:pb-2 focus-visible:ring-0 focus-visible:ring-offset-0`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-1 md:bottom-2 text-[#ee7d11] hover:text-[#d66f0f] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#ee7d11] text-sm [font-family:'Source_Sans_Pro',Helvetica] mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full h-10 bg-[#ee7d11] hover:bg-[#d66f0f] rounded-[20.08px] mt-[46px] [font-family:'Source_Sans_Pro',Helvetica] text-white text-xl font-semibold tracking-[0] leading-[normal]">
              Log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};
