"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const CreatePrompt = () => {

  const router = useRouter();
  const {data:session} = useSession();

  const [submitting, Setsubmitting] = useState("");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    Setsubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if(response.ok){
        router.push('/')
      }

    } catch (error) {}
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSumbit={createPrompt}
    />
  );
};

export default CreatePrompt;
