import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [src, setSrc] = useState(7);

  const onClickHandler = () => {
    setSrc(Math.floor(Math.random() * 1008));
  };

  return (
    <section className="bg-gray-50 min-h-[90vh] flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-3xl">Pokédex</h2>
          <p className="text-s mt-4 text-[#002D74]">
            Welcome to the Pokemon World!
          </p>
          <p className="text-xs mt-4 text-[#002D74]"></p>
          <p className="text-x mt-4 text-[#002D74]">Please Log In.</p>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            onClick={onClickHandler}
            alt="login"
            className="rounded-2xl"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${src}.png`}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
