const Settings = () => {
  return (
    <div className="gradientbg fixed top-1/2 right-0 grid h-full w-[100svw] -translate-y-1/2 grid-cols-1 grid-rows-[auto,1fr,auto] place-items-center gap-8 p-4">
      <div className="flex w-full max-w-[34rem] flex-col gap-4">
        <label htmlFor="api key">OpenAI API Key</label>
        <input
          type="text"
          id="api key"
          className="h-12 rounded-2xl p-2 outline-none elevation-2"
        />
      </div>
      <div className="flex h-full w-full max-w-[34rem] flex-col gap-4">
        <label htmlFor="system">System Message</label>
        <textarea
          id="system"
          className=" h-full rounded-2xl p-2 outline-none elevation-2"
          value={`You are a very funny person who makes jokes all the time, you speak like a teenager using weird slangs`}
        />
      </div>
      <footer className="flex flex-col justify-center p-2 py-8">
        <p className="text-center">
          Created by{" "}
          <a
            href="https://mohamedbechirmejri.dev"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:underline"
          >
            MohamedBechirMejri
          </a>{" "}
          with ❤️
        </p>
        <p className="text-center ">
          <a
            href="https://github.com/MohamedBechirMejri/aichat"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Source Code
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Settings;
