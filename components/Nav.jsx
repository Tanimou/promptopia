"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const {data: session}= useSession()
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false);

  useEffect(() => {
    const setProvidersList = async () => {
      const providersList = await getProviders();
      setProviders(providersList);
    };
    setProvidersList();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* add a link */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <h1 className="logo_text">Promptopia</h1>
      </Link>

      {/* Desktop navigation */}
      {/* create a div with a className sm:flex hidden*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create" className="black_btn">
              Create prompts
            </Link>
            {/* create a button of type button and onClick it will run the signOut function and add a className outline_btn */}
            <button
              type="button"
              onClick={signOut}
              className="outline_btn"
            >
              Sign out
            </button>
            <Link href="/profile" className="flex gap-2 flex-center">
              <Image
                src={session?.user?.image}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              alt="user"
              width={30}
              height={30}
              className="rounded-full"
              onClick={() => settoggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/create"
                  className="dropdown_link"
                  onClick={() => settoggleDropDown(false)}
                >
                  My profile
                </Link>

                <Link
                  href="/create"
                  className="dropdown_link"
                  onClick={() => settoggleDropDown(false)}
                >
                  Create prompts
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    settoggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav