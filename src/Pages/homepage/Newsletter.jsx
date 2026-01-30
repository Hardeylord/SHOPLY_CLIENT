import React from "react";

const Newsletter = () => {
  return (
    <div className="mt-20 bg-muted w-full flex flex-col md:flex-row items-center justify-center h-[60vh] gap-y-3 px-10">
      <div className="font-oswald w-full md:w-1/2 text-3xl items-center justify-center flex">
      Sign in and subscribe to our newsletter to get new product updates.
      </div>
      <div className="w-full md:w-1/2 items-center justify-center flex">
        <section className="space-x-2">
          <input
            type="text"
            placeholder="shoply@gmail.com"
            className="px-3 py-4 rounded-full bg-white w-[256px]"
          />
          <button className="rounded-full bg-[#101923] py-4 text-white px-5">Subscribe</button>
        </section>
      </div>
    </div>
  );
};

export default Newsletter;
