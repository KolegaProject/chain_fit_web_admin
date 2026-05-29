import { cn } from "../utils/cn";
import logoWhite from "../assets/logo-light-bg.png";
import logoBlack from "../assets/logo-dark-bg.png";

const Logo = ({ className = "w-32" }) => {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            <img
                src={logoBlack}
                alt="Chain Fit Logo"
                className="block dark:hidden w-full h-auto object-contain transition-opacity duration-500"
            />
            <img
                src={logoWhite}
                alt="Chain Fit Logo"
                className="hidden dark:block w-full h-auto object-contain transition-opacity duration-500"
            />

        </div>
    );
};

export default Logo;