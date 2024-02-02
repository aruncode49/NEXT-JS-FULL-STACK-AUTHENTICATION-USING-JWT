const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="flex flex-col gap-5 mt-5" action="">
        <span className="flex flex-col gap-1">
          <label className="text-sm text-gray-200" htmlFor="email">
            Email
          </label>
          <input
            className="outline-none border-none px-2 py-1 rounded-md text-black"
            type="email"
            name="email"
            placeholder="Email"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label className="text-sm text-gray-200" htmlFor="password">
            Password
          </label>
          <input
            className="outline-none border-none px-2 py-1 rounded-md text-black"
            type="password"
            name="password"
            placeholder="Password"
          />
        </span>

        <button className="w-full bg-green-600 p-1 rounded-md mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
