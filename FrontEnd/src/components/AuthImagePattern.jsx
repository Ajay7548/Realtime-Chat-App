const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden min-h-screen lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-sm text-center">
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`cursor-pointer aspect-square rounded-2xl bg-primary/10 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;