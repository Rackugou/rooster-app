import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useAuth } from "../../contexts/AuthContext";

export const Dashboard = (): JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return <></>;
  }

  return (
    <main className="bg-[#003883] w-screen h-screen fixed inset-0 flex items-center justify-center overflow-hidden p-4">
      <Card className="w-full max-w-2xl bg-white shadow-[0px_4px_4px_5px_#00000040]">
        <CardHeader>
          <CardTitle className="text-[#003883] text-3xl font-semibold text-center">
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#003883]">Welkom, {user.firstName} {user.lastName}!</h2>
            
            <div className="space-y-2">
              <p className="text-[#4d526e]">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-[#4d526e]">
                <span className="font-semibold">Rol:</span> {user.role === 'admin' ? 'Administrator' : 'Gebruiker'}
              </p>
              <p className="text-[#4d526e]">
                <span className="font-semibold">Naam:</span> {user.firstName} {user.lastName}
              </p>
            </div>

            {user.role === 'admin' && (
              <div className="mt-6 p-4 bg-[#ee7d11]/10 rounded-lg border border-[#ee7d11]/20">
                <p className="text-[#ee7d11] font-semibold">
                  🔑 U heeft administrator rechten
                </p>
              </div>
            )}
          </div>

          <Button 
            onClick={handleLogout}
            className="w-full h-10 bg-[#ee7d11] hover:bg-[#d66f0f] rounded-[20.08px] [font-family:'Source_Sans_Pro',Helvetica] text-white text-xl font-semibold"
          >
            Uitloggen
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};
