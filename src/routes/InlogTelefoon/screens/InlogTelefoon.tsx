import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

const decorativePolygons = [
  {
    className: "top-[526px] left-[11px] w-[113px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-29.svg",
    alt: "Polygon",
  },
  {
    className: "top-[526px] left-[124px] w-[113px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-29.svg",
    alt: "Polygon",
  },
  {
    className: "top-[583px] left-[11px] w-[113px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-33.svg",
    alt: "Polygon",
  },
  {
    className: "top-14 left-[282px] w-[78px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-29.svg",
    alt: "Polygon",
  },
  {
    className: "top-28 left-[169px] w-[113px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-33.svg",
    alt: "Polygon",
  },
  {
    className: "top-[329px] left-[169px] w-[113px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-30.svg",
    alt: "Polygon",
  },
  {
    className: "top-[272px] left-[169px] w-[113px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-28.svg",
    alt: "Polygon",
  },
  {
    className: "top-[386px] left-[169px] w-[113px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-29.svg",
    alt: "Polygon",
  },
  {
    className: "top-[329px] left-[55px] w-[113px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-30.svg",
    alt: "Polygon",
  },
  {
    className: "top-[221px] left-0 w-[60px] h-[57px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/polygon-30.svg",
    alt: "Polygon",
  },
];

const decorativeVectors = [
  {
    className: "top-[195px] left-9 w-[159px] h-[159px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/vector-10-1.svg",
    alt: "Vector",
  },
  {
    className: "top-[87px] left-[34px] w-[159px] h-[159px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/vector-11.svg",
    alt: "Vector",
  },
  {
    className: "top-[-22px] left-[35px] w-[159px] h-[159px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/vector-8.svg",
    alt: "Vector",
  },
];

const decorativeGroups = [
  {
    className: "top-[306px] left-[37px] w-[267px] h-[268px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/group-10.png",
    alt: "Group",
  },
  {
    className: "top-[447px] left-0 w-[172px] h-[136px]",
    src: "https://c.animaapp.com/mhnx7lovJSx5PL/img/group-12.png",
    alt: "Group",
  },
];

export const InlogTelefoon = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

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
      console.log("Login successful");
    }
  };

  return (
    <div className="bg-[#003883] w-full min-w-[360px] min-h-[640px] relative overflow-hidden">
      {decorativePolygons.map((polygon, index) => (
        <img
          key={`polygon-${index}`}
          className={`absolute ${polygon.className}`}
          alt={polygon.alt}
          src={polygon.src}
        />
      ))}

      {decorativeGroups.map((group, index) => (
        <img
          key={`group-${index}`}
          className={`absolute ${group.className}`}
          alt={group.alt}
          src={group.src}
        />
      ))}

      {decorativeVectors.map((vector, index) => (
        <img
          key={`vector-${index}`}
          className={`absolute ${vector.className}`}
          alt={vector.alt}
          src={vector.src}
        />
      ))}

      <div className="absolute top-[calc(50.00%_-_163px)] left-[calc(50.00%_-_167px)] w-[346px] h-[327px]">
        <Card className="w-[334px] h-[327px] bg-white shadow-[0px_4px_4px_5px_#00000040] border-0">
          <CardContent className="p-0">
            <form onSubmit={handleLogin} className="pt-[18px] pb-[25px] px-[18px]">
              <h1 className="[font-family:'Roboto_Condensed',Helvetica] font-semibold text-[#003883] text-[32px] text-center tracking-[0] leading-[normal] mb-[31px]">
                LOG IN
              </h1>

              <div className="mb-[49px]">
                <Label
                  htmlFor="email"
                  className="[font-family:'Source_Sans_Pro',Helvetica] font-normal text-[#4d526e] text-xl tracking-[0] leading-[normal] mb-[10px] block"
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
                  className={`border-0 border-b ${errors.email ? "border-[#ee7d11]" : "border-[#c2c2c5]"} rounded-none px-0 pb-1 [font-family:'Source_Sans_Pro',Helvetica] font-normal text-[#4d526e] text-[13px] tracking-[0] leading-[normal] focus-visible:ring-0 focus-visible:ring-offset-0 h-auto`}
                />
                {errors.email && (
                  <p className="text-[#ee7d11] text-sm [font-family:'Source_Sans_Pro',Helvetica] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-[46px]">
                <Label
                  htmlFor="password"
                  className="[font-family:'Source_Sans_Pro',Helvetica] font-normal text-[#4d526e] text-xl tracking-[0] leading-[normal] mb-[10px] block"
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
                    className={`border-0 border-b ${errors.password ? "border-[#ee7d11]" : "border-[#c2c2c5]"} rounded-none px-0 pr-8 pb-1 [font-family:'Source_Sans_Pro',Helvetica] font-normal text-[#4d526e] text-[13px] tracking-[0] leading-[normal] focus-visible:ring-0 focus-visible:ring-offset-0 h-auto`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-1 text-[#ee7d11] hover:text-[#d66f0f] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#ee7d11] text-sm [font-family:'Source_Sans_Pro',Helvetica] mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full h-10 bg-[#ee7d11] hover:bg-[#ee7d11]/90 rounded-[20.08px] [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal]">
                Log in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
