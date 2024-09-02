"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts)
      } catch (error) {
        console.error("handleDelete ~ error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id]);

  return (
    <Profile
      name="My Name"
      desc="Welcome to your personalized profile"
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
