import { Button } from "components/ui/button"


interface SocialLoginButtonProps {
  provider: "google" | "kakao" | "naver";
  loading?: boolean;
}

const getButtonInfo = (provider: SocialLoginButtonProps["provider"]) => {
  switch (provider) {
    case "google":
      return {
        text: "Google로 로그인",
        bgColor: "bg-red-500",
        hoverColor: "hover:bg-red-600",
        textColor: "text-white",
      };
    case "kakao":
      return {
        text: "카카오로 로그인",
        bgColor: "bg-yellow-400",
        hoverColor: "hover:bg-yellow-500",
        textColor: "text-black",
      };
    case "naver":
      return {
        text: "네이버로 로그인",
        bgColor: "bg-green-500",
        hoverColor: "hover:bg-green-600",
        textColor: "text-white",
      };
  }
};

export default function SocialLoginButton({ provider, loading }: SocialLoginButtonProps) {
  const { text, bgColor, hoverColor, textColor } = getButtonInfo(provider);
  const loadingText = "로그인 중...";

  return (
    <Button
      onClick={() => (window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`)}
      disabled={loading}
      className={`w-full ${bgColor} ${hoverColor} ${textColor} h-12 rounded-xl`}
    >
      {loading ? loadingText : text}
    </Button>
  );
}