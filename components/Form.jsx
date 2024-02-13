import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSumbit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imaginationrun wild with any AI-powered platform
      </p>
      <form
        action=""
        onSubmit={handleSumbit}
        className="mt-10 w-full max-w-2xl fflex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your Prompt here"
            className="form_textarea"
          />
        </label>

        <label htmlFor="">
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Tag {" "}
          <span className="font-normal">(#webdev, #product, #idea ...etc)</span>
        </span>
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#tag"
          className="form_input"
          required
        />
      </label>
      <div className="flex-end mx-3 m-5 gap-4">
      <Link href="/" className="text-gray-500 text-sm">
      Cancel
      </Link>

      <button type="submit" disabled={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
      {submitting? `${type}...`: type}
      </button>
      </div>
      </form>
    </section>
  );
};

export default Form;
