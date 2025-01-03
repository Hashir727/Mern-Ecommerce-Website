import React from "react";

function NewsLetterBox() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Sign up for our newsletter to stay updated on the latest trends,
        exclusive deals, and special offers!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 rounded-md mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-900 rounded-r-md text-white text-sm px-10 py-4"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewsLetterBox;
